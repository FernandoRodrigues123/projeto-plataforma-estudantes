import CampoTexto from '../../Inputs/CampoTexto/CampoTexto.js';

import './deletarCadastroForm.css';
import { useState, useContext } from 'react';
import { Context } from '../../../Context/AuthProvider.js';
import { useNavigate } from 'react-router-dom';
import deletarEstudante from '../../../request/EstudanteRequest/deletarEstudante.js';

const DeletarCadastroForm = () => {
    const nav = useNavigate();
    const ctx = useContext(Context)
    const token = localStorage.getItem('token')

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        enviar()
    }



    const enviar  = async () => {

        if (token != null || token !== '') { 
            console.log(token);
        deletarEstudante(token, login, senha).then(response => {
            if (response != null) {
                ctx.setToken('');
                ctx.setLogin('');
                ctx.setAutenticado(false);
                ctx.setTempoDeCriacaoDoToken(null);
                nav("/login")
            }
        });
        
    }else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        enviar()
    }
}

return (
    <section className='sessao-form'>

        <form onSubmit={aoClicarNoBotao} className='form'>
            <CampoTexto valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
            <CampoTexto valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>

            <button type="submit" className="botao" id="botao-login" onClick={aoClicarNoBotao}>Deletar</button>

        </form>

    </section>
);
}

export default DeletarCadastroForm;
