import { useState, useEffect } from 'react';
import disparaLike from '../../../request/PublicacoesRequest/disparaLike';
import buscaTokenELogin from '../../../util/buscaToken/buscaTokenELogin';
import './publicacaoCard.css';
import isLiked from '../../../request/PublicacoesRequest/liked';

const PublicacaoCard = (props) => {
    const [login, setLogin] = useState('');
    const [token, setToken] = useState('');
    const [liked, setLiked] = useState(false);
    const [src, setSrc] = useState(require('../../../imagens/like/like.png')); // Imagem inicial

    const pub = props.publicacao;

    useEffect(() => {
        // Buscar token e login ao montar o componente
        buscaTokenELogin().then(response => {
            setToken(response.token);
            setLogin(response.login);

            // Verifica se a publicação já foi curtida
            return isLiked(pub.id, response.login, response.token);
        }).then(isAlreadyLiked => {
            setLiked(isAlreadyLiked);
            setSrc(isAlreadyLiked 
                ? require('../../../imagens/liked/like.png')  // Imagem de curtida
                : require('../../../imagens/like/like.png')); // Imagem de não curtida
        }).catch(error => {
            console.error("Erro ao verificar se a publicação foi curtida:", error);
        });
    }, [pub.id]); // Adiciona `pub.id` como dependência para evitar erros de re-renderização

    const disparaCurtir = () => {
        if (!token || !login) {
            alert("Token ou login não disponível.");
            return;
        }

        disparaLike(pub.id, login, token).then(response => {
            if (response != null) {
                setLiked(true);
                setSrc(require('../../../imagens/liked/like.png'));  // Atualiza para imagem de curtida
            } else {
                setLiked(false);
                setSrc(require('../../../imagens/like/like.png'));  // Atualiza para imagem de não curtida
            }
        }).catch(error => {
            console.error("Erro ao curtir publicação:", error);
            alert("Erro ao curtir a publicação.");
        });
    };

    return (
        <div className='card'>
            <header id="cabecario-publicacao">
                <div id='conteudo'>
                    <img id='foto-perfil' src={`${pub.estudante.urlImagem}`} alt='foto do estudante' />
                    <p id='nome'>{pub.estudante.nome}</p>
                </div>
            </header>
            <div className='corpo'>
                <div className='titulo'>
                    <h1>{pub.titulo}</h1>
                </div>
                <div className='corpo'>
                    <p>{pub.corpo}</p>
                    <br />
                    <p>{pub.referencia}</p>
                </div>
            </div>
            <footer>
                <button className='botao-like' onClick={disparaCurtir}>
                    <img id="like-icon" src={src} alt='like' />
                </button>

                <p>{pub.quantidadeLikes}</p>
            </footer>
        </div>
    );
};

export default PublicacaoCard;
