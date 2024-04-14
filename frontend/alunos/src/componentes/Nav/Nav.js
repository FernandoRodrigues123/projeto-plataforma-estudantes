import Opcoes from '../Opcoes/Opcoes'
import './nav.css'
const Nav = () => {

    return (
        <nav>
            <div className='contem'>
                <div className='contem-esquerda'>
                    <div className="esquerda">
                        <Opcoes className="opcoes" />
                        <h1><a href="/home">UniAlunos</a></h1>
                    </div>
                </div>
                <div className="contem-direita">
                    <div className='direita'>
                        <a href='/buscar' id='lupa-ancora'><img id='lupa-img' className='img-opcoes' src={require('../../imagens/lupa/lupa.png')} alt='pesquisa' /></a>
                        <h2><a href="/perfil">perfil</a></h2>

                    </div>
                </div>
            </div>

        </nav>
    )

}

export default Nav