import buscaEstudante from "../../../request/EstudanteRequest/buscaEstudante";
import { useState, useEffect } from "react";
import './perfil.css'
import { Estudante } from "../../../tipos/estudante";
import DeletarPublicacao from "../../Publicacao/DeletarPublicacao/DeletarPublicacao";
import { publicacaoPagina } from "../../../tipos/publicacao";
import PublicacaoCardSemEstudante from "../../Publicacao/PublicacaoCardSemEstudante/PublicacaoCardSemEstudante"
import Paginacao from "../../Publicacao/Paginacao/Paginacao";
const Perfil = () => {
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const [estudante, setEstudante] = useState(Estudante);
  const [publicacoesPage, setPublicacoesPage] = useState(publicacaoPagina)
  const [requisicaoValida, setRequisicaoValida] = useState(true)
  const [numeroPagina, setNumeroPagina] = useState(0);
  let id = 0
  console.log(publicacoesPage.content);

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
  const handlePageChange = async (novoNumeroDePaginas) => {
    await setNumeroPagina(novoNumeroDePaginas);
  };


  const deletar = () => {
    DeletarPublicacao(token, login, id);

  }
  return (
    <div className='estudante'>
      <header id='cabecario-estudante'>
        <h1 id='nome'>{estudante.nome}</h1>
        <div id='acoes'>
          <h2 id='atualizar'><a href='/atualizarCadastro'>atualizar dados de cadastro</a></h2>
          <h2><a href="/deletarCadastro">deletar cadastro</a></h2>
        </div>
      </header>
      <Paginacao page={publicacoesPage} onChange={handlePageChange} value={numeroPagina} />
      {publicacoesPage.content.map(pub => (
        <div id='publicacao-card-perfil' className='publicacao-card' key={pub.id} >
          <div id='publicacao'> 
            <PublicacaoCardSemEstudante publicacao={pub} ></PublicacaoCardSemEstudante>
          </div>
          <p style={{ display: 'none' }} className='gambiarra-das-brava'>{id = pub.id}</p>
          <footer id='rodape-publicacao-perfil-privado'>
            <button id='atualizar-publicacao'><a href={`/atualizarPublicacao/${estudante.email}/${pub.id}`} >atualizar</a></button>
            <button id='deletar-publicacao' onClick={deletar}>deletar</button>
          </footer>
        </div>
      ))}
      <Paginacao page={publicacoesPage} onChange={handlePageChange} value={numeroPagina} />

    </div>
  );
};

export default Perfil;