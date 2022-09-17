import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function ButtonLogout() {

    const { signOut } = useContext(AuthContext);

    function handleSignout() {
        signOut();
    }

    return (
        <TouchableOpacity onPress={handleSignout}>
            <View style={styles.container}>
                <Text style={styles.texto}>Sair</Text>
                <Feather name='log-out' size={28} color="#FFF" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 25
    },
    texto: {
        color: '#FFF',
        fontSize: 22,
        marginRight: 10
    }
});