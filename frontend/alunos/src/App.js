
import './App.css';
import Home from './componentes/Home/Home.js';
import Login from './componentes/Login/Login.js';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';




export const Context = createContext();
function App() {
  const [token, setToken] = useState('');


  return (

    <Context.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </Context.Provider>

  );

}

export default App;