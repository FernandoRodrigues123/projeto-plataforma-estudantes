
import './paginacao.css';

const Paginacao = (props) => {

    const menos = () =>{
      
        props.onChange(props.value - 1);
    }
    const mais = () =>{
   
        props.onChange(props.value + 1);
    }

    return (
        <div className="paginacao-container">
            <div className="paginacao-inner">
                <button
                    className="paginacao-botao"
                    id='menos'
                    disabled={props.page.first}
                    onClick={menos}
                >
              <img src={require('../../../imagens/setas/seta-esquerda.png')} alt='seta direita'></img>
                </button>
                <p className="paginacao-texto">{`${props.page.number + 1} de ${props.page.totalPages}`}</p>
                <button
                    className="paginacao-botao"
                    id='mais'
                    disabled={props.page.last}
                    onClick={mais}
                >
                    <img src={require('../../../imagens/setas/seta-direito.png')} alt='seta direita'></img>
                </button>
            </div>
        </div>
    );
}

export default Paginacao;