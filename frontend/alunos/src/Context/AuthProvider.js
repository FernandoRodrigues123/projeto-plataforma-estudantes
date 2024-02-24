import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || '';
  });

  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem('login');
    return storedLogin || '';
  });

  const [autenticado, setAutenticado] = useState(() => {
    const storedAutenticado = localStorage.getItem('autenticado');
    return storedAutenticado === 'true'; // Convertendo para booleano
  });

  const [tempoDeCriacaoDoToken, setTempoDeCriacaoDoToken] = useState(() => {
    const storedTempoDeCriacaoDoToken = localStorage.getItem('tempoDeCriacaoDoToken');
    return storedTempoDeCriacaoDoToken ? parseInt(storedTempoDeCriacaoDoToken, 10) : null;
  });

  useEffect(() => {
    // Função para verificar se o token expirou após uma hora
    const tokenExpirou = () => {
      if (tempoDeCriacaoDoToken) {
        const horaAtual = new Date().getTime();
        const umaHoraEmMillis = 60 * 60 * 1000;

        return horaAtual - tempoDeCriacaoDoToken > umaHoraEmMillis;
      }

      return false;
    };

    // Verifica se o token expirou e atualiza os estados
    if (tokenExpirou()) {
      setToken('');
      setLogin('');
      setAutenticado(false);
      setTempoDeCriacaoDoToken(null);
    }

    // Atualiza o localStorage sempre que o token é alterado
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    localStorage.setItem('autenticado', autenticado);
    localStorage.setItem('tempoDeCriacaoDoToken', tempoDeCriacaoDoToken);
  }, [token, login, autenticado, tempoDeCriacaoDoToken]);

  return (
    <Context.Provider value={{ token, setToken, login, setLogin, autenticado, setAutenticado, tempoDeCriacaoDoToken, setTempoDeCriacaoDoToken }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
