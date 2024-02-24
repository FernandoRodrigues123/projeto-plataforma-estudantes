import React from 'react';
import { AuthProvider } from './Context/AuthProvider.js';
import Home from './componentes/Home/Home.js';
import Login from './componentes/Autenticacao/FormLogin/FormLogin.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './componentes/Autenticacao/Cadastro/Cadastro.js';
import Perfil from './componentes/Usuario/Perfil/Perfil.js';
import Nav from './componentes/Nav/Nav.js';
import PublicacaoForm from './componentes/Publicacao/PublicacaoPost/PublicacaoForm.js';
import AtualizarCadastroForm from './componentes/Usuario/AtualizarCadastroForm/AtualizarCadastroForm.js';
import DeletarCadastroForm from './componentes/Usuario/DeletarCadastroForm/DeletarCadastroForm.js';
import AtualizarPublicacao from './componentes/Publicacao/AtualizarPublicacao/AtualizarPublicacao.js';

function PrivateRoute({ element }) {
  const autenticado = localStorage.getItem('autenticado');
  console.log("em app autenticado " + autenticado);

  if (autenticado === 'false') {
    return <Navigate to='/login' />;
  } else {
    return element;
  }
}

function PublicRoute({ element }) {
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Nav></Nav>

      <div id="root"></div>
      <div id="opcoes-portal-root"></div>

      <Router>
        <Routes>
          <Route path="/atualizarPublicacao/*" element={<PrivateRoute element={<AtualizarPublicacao />}/>}/>
          <Route path="/deletarCadastro" element={<PrivateRoute element={<DeletarCadastroForm />} />} />
          <Route path="/atualizarCadastro" element={<PrivateRoute element={<AtualizarCadastroForm />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/postar" element={<PrivateRoute element={<PublicacaoForm />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/cadastro" element={<PublicRoute element={<Cadastro />} />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
