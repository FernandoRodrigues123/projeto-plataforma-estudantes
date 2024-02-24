import './botao.css'
import { useNavigate } from 'react-router-dom';
const Botao = (props) =>{
    const nav = useNavigate();
    if(props.redirecionar){
        nav("/cadastro")
    }

    

    return(
        <button className='botao'>
            {props.texto}
        </button >
    )

}
export default Botao;