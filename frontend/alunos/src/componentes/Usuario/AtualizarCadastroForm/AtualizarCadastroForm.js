import { useState } from "react";
import alterarEstudante from "../../../request/EstudanteRequest/alterarEstudante";
import CampoTexto from "../../Inputs/CampoTexto/CampoTexto";
import Botao from "../../Inputs/Botao/Botao";
import { useNavigate } from 'react-router-dom'

const AtualizarCadastroForm = () => {
  const token = localStorage.getItem('token');
  const loginAuth = localStorage.getItem('login');
  const [nome, setNome] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [areaDeEstudo, setAreaDeEstudo] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const fetchData = async () => {

    if (token != null && loginAuth != null) {
      try {
        await alterarEstudante(token, loginAuth, nome, dataDeNascimento, areaDeEstudo, email)
       
      } catch (error) {
        console.error("Erro ao buscar estudante:", error);
      }
    } else {
      console.log("Token é nulo. Aguardando 2 segundos...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Aguarda 2 segundos
      console.log("Continuando a execução após a espera");
      // Retome a execução da função chamando fetchData novamente
      fetchData();
    }
    nav("/perfil")
  };


  const aoClicarNoBotao = (evento) => {
    evento.preventDefault();
    fetchData()
  }
  return (
    <section className='sessao-atualizar'>
      <form className='form-atualizar' onSubmit={aoClicarNoBotao}>
        <CampoTexto tipo='text' valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
        <CampoTexto tipo='text' valor={dataDeNascimento} aoAlterado={valor => setDataDeNascimento(valor)} placeholder='data de nascimento' label='data de nascimento'></CampoTexto>
        <CampoTexto tipo='text' valor={areaDeEstudo} aoAlterado={valor => setAreaDeEstudo(valor)} placeholder='area de estudo' label='area de  estudo'></CampoTexto>
        <CampoTexto tipo='text' valor={email} aoAlterado={valor => setEmail(valor)} placeholder='email' label='email'></CampoTexto>
        <Botao className="botao" texto='Cadastrar' aoClicar={aoClicarNoBotao}></Botao>
      </form>
    </section>
  );

}
export default AtualizarCadastroForm