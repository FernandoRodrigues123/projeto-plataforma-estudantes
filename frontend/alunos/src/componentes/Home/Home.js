import './home.css';
import { useEffect, useState } from 'react';
import BuscaTodasPublicacoesRequest from '../../request/PublicacoesRequest/buscaTodasPublicacoesRequest';
import { publicacaoPagina } from '../../tipos/publicacao';
import Paginacao from '../Publicacao/Paginacao/Paginacao.js';
import PublicacaoCard from '../Publicacao/PublicacaoCard/PublicacaoCard.js'

const Home = () => {
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [pagina, setPagina] = useState(publicacaoPagina);
    const [requisicaoValida, setRequisicaoValida] = useState(true)
    const token = localStorage.getItem('token');
    

    const fetchData = async (numeroPagina) => {
        try {
            if (token != null && requisicaoValida) {
                const data = await BuscaTodasPublicacoesRequest(token, numeroPagina);
                setPagina(data);
                setRequisicaoValida(false)
            } else if (requisicaoValida) {
                console.log("Token é nulo. Aguardando 2 segundos...");
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log("Continuando a execução após a espera");
                await fetchData(numeroPagina); // Chame a função novamente após a espera
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData(numeroPagina);
        // Adicione a dependência numeroPagina
    }); // Adicione token como dependência

    const handlePageChange = async (novoNumeroDePaginas) => {
        await setNumeroPagina(novoNumeroDePaginas);
    };

    return (
        <div className='contem-pagina'>
            <Paginacao page={pagina} onChange={handlePageChange} value={numeroPagina} />

            <div>
                <div className='pagina'>
                    <div className='publicacoes'>
                        {pagina.content.map(pub => (
                            <div className='publicacao' key={pub.id}>
                                <PublicacaoCard publicacao={pub}></PublicacaoCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Paginacao page={pagina} onChange={handlePageChange} value={numeroPagina} />
        </div>
    );
}

export default Home;
