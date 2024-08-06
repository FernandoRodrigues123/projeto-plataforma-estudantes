import buscaEstudante from "../../../request/EstudanteRequest/buscaEstudante";
import { useState, useEffect } from "react";
import './perfil.css'
import { Estudante } from "../../../tipos/estudante";
import DeletarPublicacao from "../../Publicacao/DeletarPublicacao/DeletarPublicacao";
import { publicacaoPagina } from "../../../tipos/publicacao";
import PublicacaoCardSemEstudante from "../../Publicacao/PublicacaoCardSemEstudante/PublicacaoCardSemEstudante"
const Perfil = () => {
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const [estudante, setEstudante] = useState(Estudante);
  const [publicacoesPage, setPublicacoesPage] = useState(publicacaoPagina)
  const [requisicaoValida, setRequisicaoValida] = useState(true)
  
  let id = 0
  console.log(publicacoesPage.content);

  var partesData = String(estudante.dataDeNascimento).split('-'); 
  var anoDeNascimento = parseInt(partesData[0]);
  
  var idade = new Date().getFullYear() - anoDeNascimento 

  const fetchData = async () => {
    if ((token != null && token !== "") && (login != null && login !== "") && requisicaoValida) {
      try {
        const data = await buscaEstudante(token, login);
        setEstudante(data);
        setPublicacoesPage(data.publicacoes)
        setRequisicaoValida(false)
      } catch (error) {
        console.error("Erro ao buscar estudante:", error);
      }
    } else if (requisicaoValida === true) {
      console.log("Token é nulo. Aguardando 2 segundos...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Aguarda 2 segundos
      console.log("Continuando a execução após a espera");
      // Retome a execução da função chamando fetchData novamente
      fetchData();
    }
  };
  useEffect(() => {
    fetchData()
  });



  const deletar = () => {
    DeletarPublicacao(token, login, id);

  }
  return (
    <div className='estudante'>
      <header id='cabecario-estudante'>

       <img id='foto-perfil' src={`${estudante.urlImagem}`}></img>
        <h1 className="campo">{estudante.nome}</h1>
        <p className="campo">idade {idade}</p>
        <p className="campo">{estudante.areaDeEstudo}</p>
        <div id='acoes'>
          <h2 id='atualizar' className="put-del"><a href='/atualizarCadastro'>editar</a></h2>
          <h2 id="deletar" className="put-del"><a href="/deletarCadastro">deletar</a></h2>
        </div>
      </header>
     
      {publicacoesPage.content.map(pub => (
        <div id='publicacao-card-perfil' className='publicacao-card' key={pub.id} >
          <div id='publicacao'> 
            <PublicacaoCardSemEstudante publicacao={pub} ></PublicacaoCardSemEstudante>
          </div>
          <p style={{ display: 'none' }} className='gambiarra-das-brava'>{id = pub.id}</p>
          <footer id='rodape-publicacao-perfil-privado'>
            <button className="put-del"><a href={`/atualizarPublicacao/${estudante.email}/${pub.id}`} >editar</a></button>
            <button id='deletar-publicacao' onClick={deletar}>deletar</button>
          </footer>
        </div>
      ))}
     
    </div>
  );
};

export default Perfil;