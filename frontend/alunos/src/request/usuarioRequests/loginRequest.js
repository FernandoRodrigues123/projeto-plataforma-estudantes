async function loginRequest(login, senha) {

    const response = await fetch("http://localhost:8080/estudantes/login", {
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
