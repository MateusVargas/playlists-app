import React from 'react';
import {AuthProvider} from './src/contexts/Auth'
import App from './App'

//esse arquivo foi criado pra declarar o contexto de auth em outro lugar dirente do app.js
//porque não pode declarar e usar o contexto no mesmo arquivo
export default function AppWrapperAuth() {
    return (
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
}