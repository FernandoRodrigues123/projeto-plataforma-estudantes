    
import './publicacaoCard.css'

const PublicacaoCard = (props) =>{
    const pub = props.publicacao;
    return(
        <div>
            <h2>{pub.estudante.nome}</h2>
            <h1>{pub.titulo}</h1>
            <p>{pub.corpo}</p>
            <br></br>
            <p>{pub.referencia}</p>
        </div>
    )

}

export default PublicacaoCard;