import React, { createContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { AnonymousIdentity } from "@dfinity/agent";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [identity, setIdentity] = useState(new AnonymousIdentity());

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();

        setIdentity(identity);

        const principal = identity.getPrincipal();

        if (!principal.isAnonymous()) {
            setIsAuthenticated(true);
        }
    }

    const login = async () => {
        const authClient = await AuthClient.create();
        //console.log("Identity Provider:", process.env.VITE_INTERNET_COMPUTER_PROVIDER); 
        authClient.login({
            identityProvider: import.meta.env.VITE_INTERNET_COMPUTER_PROVIDER,
            // identityProvider: 'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/',  //solo como referencia
            onSuccess: async () => {
                const identity = authClient.getIdentity();
                setIdentity(identity);
                setIsAuthenticated(true);
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    const logout = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setIdentity(new AnonymousIdentity());
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, identity, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
