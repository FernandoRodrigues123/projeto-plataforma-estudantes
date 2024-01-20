
import './App.css';
import { AuthProvider, Context } from './Context/AuthProvider.js';
import Home from './componentes/Home/Home.js';
import Login from './componentes/Login/Login.js';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';





function App() {
  const [token, setToken] = useState('');


  return (

   <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      </AuthProvider>

  );

}

export default App;