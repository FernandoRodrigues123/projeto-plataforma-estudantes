import CampoTexto from '../../Inputs/CampoTexto/CampoTexto.js';

import './formLogin.css';
import { useState, useContext } from 'react';
import loginRequest from '../../../request/usuarioRequests/loginRequest.js';
import { Context } from '../../../Context/AuthProvider.js';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const nav = useNavigate();
    const ctx = useContext(Context)

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        const botaoId = evento.currentTarget.id;
        console.log(botaoId)

        if (botaoId === 'botao-login') {
            enviar(login, senha);
        } else if (botaoId === 'botao-cadastro') {
            chamaCadastro()
        }
    }

    const chamaCadastro = () => {
        nav("/cadastro")
    }

    const enviar = (login, senha) => {
        loginRequest(login, senha).then(response => {
            if (response != null) {
                console.log("token form login: " + response.tokenJWT)

                ctx.setToken(response.tokenJWT);
                ctx.setLogin(login);
                ctx.setAutenticado(true);
                ctx.setTempoDeCriacaoDoToken(new Date().getTime());
                nav('/home')
            }
        });

    }

    return (
        <section className='sessao-login'>

            <form onSubmit={aoClicarNoBotao} className='form-login'>
                <CampoTexto valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>

                <div className='contem-botoes'>
                    <button type="submit" className="botao" id="botao-login" onClick={aoClicarNoBotao}>Login</button>
                    <button type="button" className="botao" id="botao-cadastro" onClick={aoClicarNoBotao}>Cadastrar</button>
                </div>
            </form>

        </section>
    );
}

export default FormLogin;
