
import './campoTexto.css'

const CampoTexto = (props) =>{
    const placeholder = `${props.placeholder}`
    
    
   
    const aoDigitado = (evento) =>{
        props.aoAlterado(evento.target.value)

    }
    return(
        <div className='campo-texto'>
            <label>{props.label}</label>
            <input value={props.valor} onChange={aoDigitado} placeholder={placeholder}/>
        </div>
    )

}

export default CampoTexto;
