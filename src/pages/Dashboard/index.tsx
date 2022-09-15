import React, { useContext, useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');

    async function openOrder() {
        if (number === '') {
            return;
        }

        // table é o campo que deve ser enviado para a api
        // a propriedade number está como string, precisa converter
        const response = await api.post('/api/orders', {
            table: Number(number)
        });

        //console.log(response.data);

        // vai para a próxima tela enviando esses parâmetros
        navigation.navigate('Order', {number: number, order_id: response.data.id});
        setNumber('');
    }
     
    // o safe-area-view é para o Iphone
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput placeholder="Mesa" placeholderTextColor="#F0F0F0"
                style={styles.input} keyboardType='numeric'
                value={number} onChangeText={setNumber} />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // para pegar o tamanho inteiro da tela
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
});