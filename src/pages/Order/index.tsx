import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

// a tabela de categorias no banco tem id e name
export type CategoryProps = {
    id: string;
    name: string;
}

// ver o que tem na tabela de produtos no banco de dados
type ProductProps = {
    id: string;
    name: string;// tem outras propriedades na tabela
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    // pega os parâmetros enviados pela tela anterior
    const route = useRoute<OrderRouteProps>();
    const navigate = useNavigation();

    // pode ser um array de categorias ou um array vazio
    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    // pode ser um array de produtos ou um array vazio
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);

    // quando carregar a tela, chama o que estiver dentro de useEffect
    useEffect(() => {
        // busca as categorias para carregar botão selecionar categoria
        async function loadCategories() {
            const response = await api.get('/api/categories');
            
            //console.log(response.data);

            setCategory(response.data);
            setCategorySelected(response.data[0]);// pega a primeira
        }

        loadCategories();
    }, []);

    // quando mudar o seletor de categorias, chama esse useEffect
    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/api/products', {
                params: {
                    category_id: categorySelected?.id,
                }
            });

            //console.log(response.data);

            setProducts(response.data);
            setProductSelected(response.data[0]);// pega o primeiro
        }

        loadProducts();
    }, [categorySelected]);

    async function handleCloseOrder() {
        try {
            await api.delete('/api/orders', {
                params: {
                    order_id: route.params?.order_id
                }
            });

            // volta para a tela anterior
            navigate.goBack();
        } catch (error) {
            console.log('>>> Erro ao fechar mesa: ', error);
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    // adiciona produtos ao pedido
    async function handleAddItem() {
        const response = await api.post('api/orders/items', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
          })
      
          let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
          }

          // pega o que já tem e adiciona esses dados
          setItems(oldArray => [...oldArray, data])
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa: {route.params.number}</Text>

                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="#FF3F4B" />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} 
                    onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#FFF'}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input}
                onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#FFF'}}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdTexto}>Quantidade</Text>
                <TextInput placeholder="1" placeholderTextColor="#F0F0F0"
                    keyboardType="numeric" value={amount} onChangeText={setAmount}
                    style={[styles.input, {width:'60%', textAlign:'center'}]} />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                    disabled={items.length === 0}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex:1, marginTop:24}}
                data={items} keyExtractor={(item) => item.id}
                renderItem={ ({ item }) => <ListItem data={item} />} />

            <Modal transparent={true} visible={modalCategoryVisible} animationType="fade">
                <ModalPicker handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category} selectedItem={handleChangeCategory} />
            </Modal>

            <Modal transparent={true} visible={modalProductVisible} animationType="fade">
                <ModalPicker handleCloseModal={() => setModalProductVisible(false)}
                    options={products} selectedItem={handleChangeProduct} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // pega toda a tela
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 46,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});