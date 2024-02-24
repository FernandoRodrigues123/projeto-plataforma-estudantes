
import './paginacao.css';

const Paginacao = (props) => {
    return (
        <div className="paginacao-container">
            <div className="paginacao-inner">
                <button
                    className="paginacao-botao"
                    id='menos'
                    disabled={props.page.first}
                    onClick={() => {
                        if (!props.page.first) {
                            props.onChange(props.page.number - 1);
                           
                        }
                    }}
                >
              <img src={require('../../../imagens/setas/seta-esquerda.png')} alt='seta direita'></img>
                </button>
                <p className="paginacao-texto">{`${props.page.number + 1} de ${props.page.totalPages}`}</p>
                <button
                    className="paginacao-botao"
                    id='mais'
                    disabled={props.page.last}
                    onClick={() => {
                        if (!props.page.last) {
                            props.onChange(props.page.number + 1);
                
                        }
                    }}
                >
                    <img src={require('../../../imagens/setas/seta-direito.png')} alt='seta direita'></img>
                </button>
            </div>
        </div>
    );
}

export default Paginacao;