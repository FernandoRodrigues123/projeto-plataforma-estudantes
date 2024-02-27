import CampoTexto from '../../Inputs/CampoTexto/CampoTexto.js';
import Botao from '../../Inputs/Botao/Botao.js';
import './publicacaoForm.css';
import { useState } from 'react';
import postarPublicacao from '../../../request/PublicacoesRequest/postarPublicacao.js';
import { useNavigate } from 'react-router-dom';
import {  publicacaoBase } from '../../../tipos/publicacao.js';

const PublicacaoForm = () => {
    const nav = useNavigate();

    const token = localStorage.getItem('token')
    const login = localStorage.getItem('login')

    const [titulo, setTitulo] = useState('');
    const [corpo, setCorpo] = useState('');
    const [referencia, setReferencia] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        var pub = publicacaoBase
        pub.titulo = titulo
        pub.corpo = corpo
        pub.referencias = referencia
        fetchData(pub)
      //enviarCadastro(pub);
    }

    // const enviarCadastro = (publicacao) =>{
    //     postarPublicacao(publicacao,login,token)
    // }
    const fetchData = async (publicacao) => {
        
        if (token != null && token !== '' && publicacao !== undefined) {
            await postarPublicacao(publicacao,login,token)
            nav("/home")
        } else {
            console.log("Token é nulo. Aguardando 2 segundos...");
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            console.log("Continuando a execução após a espera");
           
            fetchData(publicacao);
        }   
    }; 



    return (
        <section className='sessao-form'>
            <form className='form' onSubmit={aoClicarNoBotao}>
                <CampoTexto valor={titulo} aoAlterado={valor => setTitulo(valor)} placeholder='titulo' label='titulo'></CampoTexto>
                <CampoTexto valor={corpo} aoAlterado={valor => setCorpo(valor)} placeholder='corpo' label='corpo'></CampoTexto> 
                <CampoTexto valor={referencia} aoAlterado={valor => setReferencia(valor)} placeholder='referencia' label='referencia'></CampoTexto> 
                <Botao texto='postar' aoClicar={aoClicarNoBotao}></Botao>
            </form>
           
        </section>
    );
}


export default PublicacaoForm;

