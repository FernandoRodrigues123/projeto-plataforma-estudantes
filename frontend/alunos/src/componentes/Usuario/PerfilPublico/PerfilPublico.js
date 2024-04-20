import { useState, useEffect } from 'react';
import './perfilPublico.css';
import { Estudante } from '../../../tipos/estudante';
import buscaEstudanteId from '../../../request/EstudanteRequest/buscaEstudanteId';
import { publicacaoPagina } from '../../../tipos/publicacao';
import PublicacaoCardSemEstudante from '../../Publicacao/PublicacaoCardSemEstudante/PublicacaoCardSemEstudante';

function getIdUri(){
    
    var url = window.location.href;
    var partesDaUrl = url.split('/');
    return partesDaUrl[partesDaUrl.length - 1]
}
function getIdade(dataDeNascimento){
    var partesData =String(dataDeNascimento).split('-'); 
    var anoDeNascimento = parseInt(partesData[0]);
    var idade = new Date().getFullYear() - anoDeNascimento;
    return idade
}


const PerfilPublico = () => {
    const token = localStorage.getItem('token');
    const [estudante, setEstudante] = useState(Estudante);
    const [id] = useState(getIdUri()); 
    const [publicacoesPage, setPublicacoesPage] = useState(publicacaoPagina)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await buscaEstudanteId(token, id);
                setEstudante(data);
                setPublicacoesPage(data.publicacoes)
            } catch (error) {
                console.error('Erro ao buscar estudante:', error);
            }
        };

        fetchData();

    }, [token, id]);

    return (
        <div className='estudante'>
            <header id='cabecario-estudante'>
                <h1 className="campo">{estudante.nome}</h1>
                <p className="campo">{estudante.areaDeEstudo}</p>
                <p className='campo'>idade {getIdade(estudante.dataDeNascimento)}</p>
            </header>
            {publicacoesPage.content.map(pub => (
        <div id='publicacao-card-perfil' className='publicacao-card' key={pub.id} >
          <div id='publicacao'> 
            <PublicacaoCardSemEstudante publicacao={pub} ></PublicacaoCardSemEstudante>
          </div>
        </div>
      ))}
        </div>
    );
};

export default PerfilPublico;
