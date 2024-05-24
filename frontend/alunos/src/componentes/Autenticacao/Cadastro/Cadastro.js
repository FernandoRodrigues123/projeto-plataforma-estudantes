import CampoTexto from '../../Inputs/CampoTexto/CampoTexto';
import Botao from '../../Inputs/Botao/Botao';
import './cadastro.css';
import { useState } from 'react';
import cadastroRequest from '../../../request/usuarioRequests/cadastrorequest';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../../../services/uplouds3/uplouds3';

const Cadastro = () => {
    const nav = useNavigate();
    const [imagem, setImagem] = useState(null); // Alterado para null
    const [nome, setNome] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [areaDeEstudo, setAreaDeEstudo] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = async (evento) => {
        evento.preventDefault();
        
        // Verifica se uma imagem foi selecionada
        if (imagem) {
            try {
                // Realiza o upload do arquivo
                const data = await uploadFile({ target: { files: [imagem] } });
                // Obtém a URL  do arquivo enviado
                console.log(" cadastro data"+data);
                const urlImagem = data.Location;
                console.log(urlImagem);
                // Chama a função de salvar com a URL da imagem
                salva(urlImagem, nome, dataDeNascimento, areaDeEstudo, email, login, senha);
            } catch (error) {
                console.error("Erro no upload da imagem", error);
            }
        } else {
            // Chama a função de salvar sem a URL da imagem
            salva('', nome, dataDeNascimento, areaDeEstudo, email, login, senha);
        }
    }

    const salva = (urlImagem, nome, dataDeNascimento, areaDeEstudo, email, login, senha) => {
        cadastroRequest(nome, dataDeNascimento, areaDeEstudo, email, login, senha, urlImagem)
            .then(response => {
                if (response.status === 400) {
                    alert("Verifique os campos. Todos os campos são obrigatórios e login e email devem ser únicos.");
                }
                if (response.status === 201) {
                    nav("/login");
                }
            })
            .catch(error => {
                console.error("Erro no cadastro", error);
            });
    }

    return (
        <section className='sessao-form'>
            <form className='form' onSubmit={aoClicarNoBotao}>
                <div className='campo-texto'>
                    <div className='input'>
                        <input type="file" onChange={e => setImagem(e.target.files[0])}></input>
                    </div>
                </div>
                <CampoTexto tipo='text' valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
                <CampoTexto tipo='date' valor={dataDeNascimento} aoAlterado={valor => setDataDeNascimento(valor)} placeholder='data de nascimento' label='data de nascimento'></CampoTexto>
                <CampoTexto tipo='text' valor={areaDeEstudo} aoAlterado={valor => setAreaDeEstudo(valor)} placeholder='area de estudo' label='area de  estudo'></CampoTexto>
                <CampoTexto tipo='text' valor={email} aoAlterado={valor => setEmail(valor)} placeholder='email' label='email'></CampoTexto>
                <CampoTexto tipo='text' valor={login} aoAlterado={valor => setLogin(valor)} placeholder='login' label='login'></CampoTexto>
                <CampoTexto tipo='password' valor={senha} aoAlterado={valor => setSenha(valor)} placeholder='senha' label='senha'></CampoTexto>
                <Botao className="botao" texto='Cadastrar' aoClicar={aoClicarNoBotao}></Botao>
            </form>
        </section>
    );
}

export default Cadastro;
