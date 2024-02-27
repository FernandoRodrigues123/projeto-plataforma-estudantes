import CampoTexto from '../../Inputs/CampoTexto/CampoTexto';
import Botao from '../../Inputs/Botao/Botao';
import './cadastro.css';
import { useState } from 'react';
import cadastroRequest from '../../../request/usuarioRequests/cadastrorequest'
import { useNavigate } from 'react-router-dom';
const Cadastro = () => {
    const nav = useNavigate();
    const [nome, setNome] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [areaDeEstudo, setAreaDeEstudo] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        salva(nome, dataDeNascimento, areaDeEstudo, email, login, senha);
    }

    const salva = (nome, dataDeNascimento, areaDeEstudo, email, login, senha) => {

        cadastroRequest(nome, dataDeNascimento, areaDeEstudo, email, login, senha).then(response => {
           if(response.status === 400){
                alert("verifique os campos")
                alert("todos os campos obrigatorio e login e email devem ser unicos")
           }
           if(response.status === 201){
                nav("/login")
           }
        })
    }

    return (
        <section className='sessao-form'>
            <form className='form' onSubmit={aoClicarNoBotao}>
                <CampoTexto tipo='text' valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
                <CampoTexto tipo='date' valor={dataDeNascimento} aoAlterado={valor => setDataDeNascimento(valor)} placeholder='data de nascimento' label='data de nascimento'></CampoTexto>
                <CampoTexto tipo='text' valor={areaDeEstudo} aoAlterado={valor => setAreaDeEstudo(valor)} placeholder='area de estudo' label='area de  estudo'></CampoTexto>
                <CampoTexto tipo='text' valor={email} aoAlterado={valor => setEmail(valor)} placeholder='email' label='email'></CampoTexto>
                <CampoTexto tipo='text' valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto tipo='text' valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>
                <Botao className="botao" texto='Cadastrar' aoClicar={aoClicarNoBotao}></Botao>
            </form>
        </section>
    );
}

export default Cadastro;
