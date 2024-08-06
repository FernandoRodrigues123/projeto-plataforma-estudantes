
import './publicacaoCard.css'

const PublicacaoCard = (props) => {
    const pub = props.publicacao;
    return (
        <div className='card'>
            <header id="cabecario-publicacao">
                <div id='conteudo'><img id='foto-perfil' src={`${pub.estudante.urlImagem}`} alt='foto do estudante'></img>
                <p id='nome'>{pub.estudante.nome}</p></div>
            </header>
            <div className='corpo'>
                <div className='titulo'>
                    <h1>{pub.titulo}</h1>
                </div>
                <div className='corpo'> 
                    <p>{pub.corpo}</p>
                    <br></br>
                    <p>{pub.referencia}</p>
                </div>
            </div>
        </div>
    )

}

export default PublicacaoCard;