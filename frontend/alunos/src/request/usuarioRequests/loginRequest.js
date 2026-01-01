    async function loginRequest(login, senha) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(baseURL+"/estudantes/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            login: login,
            senha: senha,
        }),
    });
    if (response.status === 200) {
        return await response.json()
    }else{
        alert("dados invalidos")
    }
    
}

export default loginRequest;
