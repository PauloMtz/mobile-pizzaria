import React, { useState, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo install @react-native-async-storage/async-storage

import { api } from '../services/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '', name: '', email: '', token: ''
    });

    // converte o objeto user para boolean
    // e, informa que isAthenticated recebe o objeto user quando tiver algum nome
    // se tiver algum nome, vai ser true. Se não tiver, será false
    const isAuthenticated = !!user.name;

    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {email, password});
            //console.log(response.data);

            const { id, name, token } = response.data;

            const dados = {
                ...response.data
            };

            // salva os dados no asyncStorage
            await AsyncStorage.setItem('@mobilepizzaria', JSON.stringify(dados));

            // pega o token de acesso
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({id, name, email, token});
            setLoadingAuth(false);
        } catch (error) {
            console.log('>>> Erro login: ', error);
            setLoadingAuth(false);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}