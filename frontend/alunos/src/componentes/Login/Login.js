import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';
import './login.css';
import { useState } from 'react';
import loginRequest from '../../request/usuarioRequests/loginRequest';
import { useContext } from 'react';
import { Context } from '../../App.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate();
    const ctx = useContext(Context)

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        enviar(login, senha);
    }


    const enviar = (login, senha) => {
        loginRequest(login, senha).then(response => {
            ctx.setToken(response.tokenJWT);
            nav('/home')
            }   
        )
    }

    return (
        <section>
            <form onSubmit={aoClicarNoBotao}>
                <CampoTexto valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>
                <Botao texto='login' aoClicar={aoClicarNoBotao}></Botao>
            </form>
        </section>
    );
}


export default Login;

