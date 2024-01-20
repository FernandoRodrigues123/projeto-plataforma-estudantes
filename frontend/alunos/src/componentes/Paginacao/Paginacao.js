
import './paginacao.css';

const Paginacao = ( props) =>{
    return(
        <div>
    <div >
        <button  disabled={props.page.first} onClick={() => props.onChange(props.page.number - 1)} >
          
        </button>
        <p>{`${props.page.number + 1} de ${props.page.totalPages}`}</p>
        <button  disabled={props.page.last} onClick={() => props.onChange(props.page.number + 1)} >
            
        </button>
    </div>
</div>
    );
}
export default Paginacao;