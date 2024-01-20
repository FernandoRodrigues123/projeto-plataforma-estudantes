import './home.css';
import { Context } from '../../App';
import { useContext, useEffect, useState } from 'react';
import BuscaTodasPublicacoesRequest from '../../request/PublicacoesRequest/buscaTodasPublicacoesRequest';
import { publicacaoPagina } from '../../tipos/publicacao';
import Paginacao from '../Paginacao/Paginacao';
import PublicacaoCard from '../PublicacaoCard/PublicacaoCard'

const Home = () => {
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [pagina, setPagina] = useState(publicacaoPagina);
    const context = useContext(Context);


    useEffect(() => {
        const fetchData = async () => {
            console.log(context.token);
            await BuscaTodasPublicacoesRequest(context.token).then(data => {
                setPagina(data);    
                }
            )
        };
        fetchData();

    }, [context.token]);
        const handlePageChange = (novoNumeroDePaginas) => {
            setNumeroPagina(novoNumeroDePaginas);
    }

    return (
        <div>
            <Paginacao page={pagina} onChange={handlePageChange} />
            <div>
                <div>
                    {pagina.content.map(pub => (
                        <div key={pub.id}>
                            <PublicacaoCard publicacao={pub}></PublicacaoCard>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;