import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';
import './cadastro.css';
import { useState } from 'react';
import cadastroRequest from '../../request/usuarioRequests/cadastrorequest'

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [areaDeEstudo, setAreaDeEstudo] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        console.log(login + " "+ senha)
        salva(login, senha);
    }

    const salva = (nome, dataDeNascimento, areaDeEstudo, login, senha) => {
        cadastroRequest(nome, dataDeNascimento, areaDeEstudo, login, senha).then(response => {
        console.log(response);
        })
    }

    return (
        <section>
            <form onSubmit={aoClicarNoBotao}>
                <CampoTexto valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
                <CampoTexto valor={dataDeNascimento} aoAlterado={valor => setDataDeNascimento(valor)} placeholder='data de nascimento' label='data de nascimento'></CampoTexto>
                <CampoTexto valor={areaDeEstudo} aoAlterado={valor => setAreaDeEstudo(valor)} placeholder='area de estudo' label='area de  estudo'></CampoTexto>
                <CampoTexto valor={email} aoAlterado={valor =>setEmail(valor)} placeholder='email' label='email'></CampoTexto>
                <CampoTexto valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>
                <Botao texto='Cadastrar' aoClicar={aoClicarNoBotao}></Botao>
            </form>
        </section>
    );
}

export default Cadastro;
