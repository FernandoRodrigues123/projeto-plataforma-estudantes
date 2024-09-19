import './home.css';
import { useEffect, useState } from 'react';
import BuscaTodasPublicacoesRequest from '../../request/PublicacoesRequest/buscaTodasPublicacoesRequest';
import { publicacaoPagina } from '../../tipos/publicacao';
import Paginacao from '../Publicacao/Paginacao/Paginacao.js';
import PublicacaoCard from '../Publicacao/PublicacaoCard/PublicacaoCard.js'

const Home = () => {
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [pagina, setPagina] = useState(publicacaoPagina);
    const [requisicaoValida, setRequisicaoValida] = useState(true);
    const token = localStorage.getItem('token');


    const fetchData = async () => {
        try {
            
            if (token != null && requisicaoValida) {
                console.log(token);
        
                const data = await BuscaTodasPublicacoesRequest(token, numeroPagina);
                setPagina(data);
                setRequisicaoValida(false)
            } else if (requisicaoValida) {
                console.log("Token é nulo. Aguardando 2 segundos...");
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log("Continuando a execução após a espera");
                await fetchData();
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    });

    const handlePageChange = async (novoNumeroDePagina) => {
       
        await setNumeroPagina(novoNumeroDePagina);
        setRequisicaoValida(true)
        console.log("Novo número de página:", numeroPagina);
        
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
