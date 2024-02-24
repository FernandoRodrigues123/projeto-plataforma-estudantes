
import './publicacaoCardSemEstudante.css'

const PublicacaoCardSemEstudante = (props) => {
    const pub = props.publicacao;
    return (
        <div className='card'>
            
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

export default PublicacaoCardSemEstudante