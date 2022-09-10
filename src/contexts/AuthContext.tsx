import React, { useState, createContext, ReactNode } from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
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

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '', name: '', email: '', token: ''
    });

    // converte o objeto user para boolean
    // e, informa que isAthenticated recebe o objeto user quando tiver algum nome
    // se tiver algum nome, vai ser true. Se não tiver, será false
    const isAuthenticated = !!user.name;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}