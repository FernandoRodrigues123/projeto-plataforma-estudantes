async function cadastroRequest(nome, dataDeNascimento, areaDeEstudo, email, login, senha, urlImagem) {

    const baseURL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(baseURL + "/estudantes/cadastro", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            nome: nome,
            dataDeNascimento: dataDeNascimento,
            areaDeEstudo: areaDeEstudo,
            email: email,
            urlImagem: urlImagem,       
            usuario: {
                login: login,
                senha: senha,
            }

        }),
    });



    return response;

}

export default cadastroRequest;