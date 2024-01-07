import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';
import './login.css';
import { useState } from 'react';
import loginRequest from '../../request/loginRequest';

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        console.log(login + " "+ senha)
        salva(login, senha);
    }

    const salva = (login, senha) => {
        loginRequest(login, senha).then(response => {
            const tokenJWT = response.tokenJWT;
            console.log('Token JWT:', tokenJWT);
        })
    }

    return (
        <section>
            <form onSubmit={aoClicarNoBotao}>
                <CampoTexto valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>
                <Botao texto='Login' aoClicar={aoClicarNoBotao}></Botao>
            </form>
        </section>
    );
}

export default Login;
