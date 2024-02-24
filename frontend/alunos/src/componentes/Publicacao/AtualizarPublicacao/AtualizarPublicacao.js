import { useState } from 'react';
import './atualizarPublicacao.css'
import atualizarPublicacao from '../../../request/PublicacoesRequest/atualizarPublicacao';
import CampoTexto from '../../Inputs/CampoTexto/CampoTexto';
import Botao from '../../Inputs/Botao/Botao';
import { useNavigate } from 'react-router-dom';
const AtualizarPublicacao = () => {
    const token = localStorage.getItem('token')
    const login = localStorage.getItem('login')
    const nav = useNavigate();

    var url = window.location.href;
    var partesDaUrl = url.split('/');
    var idPublicacao = partesDaUrl[partesDaUrl.length - 1];

    const [titulo, setTitulo] = useState('');
    const [corpo, setCorpo] = useState('');
    const [referencia, setReferencia] = useState('');
    const [naoEnviado, setNaoEnviado] = useState(true)

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        fetchData()
    }

    const fetchData = async () => {
        if (token != null && token !== '' && naoEnviado) {
       
            
            await atualizarPublicacao(login, token, idPublicacao, titulo,corpo,referencia)
            setNaoEnviado(false)
            nav("/perfil")

        } else if (naoEnviado === 'true') {
            console.log("Token é nulo. Aguardando 2 segundos...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Continuando a execução após a espera");

            fetchData();
        }
    };


    return (
        <form onSubmit={aoClicarNoBotao}>
            <CampoTexto valor={titulo} aoAlterado={valor => setTitulo(valor)} placeholder='titulo' label='titulo'></CampoTexto>
            <CampoTexto valor={corpo} aoAlterado={valor => setCorpo(valor)} placeholder='corpo' label='corpo'></CampoTexto>
            <CampoTexto valor={referencia} aoAlterado={valor => setReferencia(valor)} placeholder='referencia' label='referencia'></CampoTexto>
            <Botao texto='confirma edicao' aoClicar={aoClicarNoBotao}></Botao>

        </form>
    )

}
export default AtualizarPublicacao