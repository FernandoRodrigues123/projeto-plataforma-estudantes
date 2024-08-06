import { useState } from "react";
import alterarEstudante from "../../../request/EstudanteRequest/alterarEstudante";
import CampoTexto from "../../Inputs/CampoTexto/CampoTexto";
import Botao from "../../Inputs/Botao/Botao";
import { useNavigate } from 'react-router-dom'
import uploadFile from "../../../services/uplouds3/uplouds3";

const AtualizarCadastroForm = () => {
  const token = localStorage.getItem('token');
  const loginAuth = localStorage.getItem('login');
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null); // Alterado para null
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [areaDeEstudo, setAreaDeEstudo] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const fetchData = async () => {

    if (token != null && loginAuth != null) {
      if (imagem) {
        try {
            // Realiza o upload do arquiv   o
            const data = await uploadFile({ target: { files: [imagem] } });
            // Obtém a URL  do arquivo enviado
            console.log(data);
            const urlImagem = data.Location;
            console.log(urlImagem);
            // Chama a função de salvar com a URL da imagem
            await alterarEstudante(token, loginAuth, nome, urlImagem, dataDeNascimento, areaDeEstudo, email)
        } catch (error) {
            console.error("Erro no upload da imagem", error);
        }
    } else {
        // Chama a função de salvar sem a URL da imagem
        await alterarEstudante(token, loginAuth,nome,null, dataDeNascimento, areaDeEstudo, email)
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
        <Botao className="botao" texto='editar' aoClicar={aoClicarNoBotao}></Botao>
    </form>
</section>
    //<section className='sessao-atualizar'>
    //  <form className='form-atualizar' onSubmit={aoClicarNoBotao}>
    //    <CampoTexto tipo='text' valor={nome} aoAlterado={valor => setNome(valor)} placeholder='nome' label='nome'></CampoTexto>
    //    <CampoTexto tipo='date' valor={dataDeNascimento} aoAlterado={valor => setDataDeNascimento(valor)} placeholder='data de nascimento' label='data de nascimento'></CampoTexto>
    //    <CampoTexto tipo='text' valor={areaDeEstudo} aoAlterado={valor => setAreaDeEstudo(valor)} placeholder='area de estudo' label='area de  estudo'></CampoTexto>
    //    <CampoTexto tipo='text' valor={email} aoAlterado={valor => setEmail(valor)} placeholder='email' label='email'></CampoTexto>
    //    
    //  </form>
    //</section>
  );

}
export default AtualizarCadastroForm