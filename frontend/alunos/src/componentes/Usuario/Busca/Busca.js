import { useState } from 'react'
import CampoTexto from '../../Inputs/CampoTexto/CampoTexto'
import './busca.css'
import buscaEstudantePorNome from '../../../request/EstudanteRequest/buscaPorNome';
import EstudanteCardSemPublicacao from '../EstudanteCardSemPublicacao/EstudanteCardSemPublicacao';

const Busca = () => {
    const [nome, setNome] = useState('');
    const token = localStorage.getItem('token');

    const [estudantes, setEstudantes] = useState();
    const carregaToken = async () => {

        if (token == null || token === '') {
            console.log("Token é nulo. Aguardando 2 segundos...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Continuando a execução após a espera");
            await carregaToken();
        }

    };

    const aoClicarNoBotao = () => {
        carregaToken()
        buscaEstudantePorNome(token, nome).then(
            response => {
                setEstudantes(response.content)
            }
        )

    }

    return (
        <div>
            <section className='sessao-form'>
                <div className='form'>
                    <CampoTexto valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
                    <div className='contem-botoes'>
                        <button onClick={aoClicarNoBotao} className='botao'>buscar</button>
                    </div>
                </div>
            </section>

            {
                estudantes != null ? 
                estudantes.map(estudante =>(
                    <EstudanteCardSemPublicacao estudante={estudante}></EstudanteCardSemPublicacao>
                )) : console.log("digite algo")
            }
        </div>

    
    )
}

export default Busca