async function alterarEstudante(token, loginAuth, nome, urlImagem,dataDeNascimento, areaDeEstudo, email, login, senha) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {

        const response = await fetch(baseURL+"/estudantes/" + loginAuth, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nome: nome,
                urlImagem: urlImagem,
                dataDeNascimento: dataDeNascimento,
                areaDeEstudo: areaDeEstudo,
                email: email,
                usuario: {
                    login: login,
                    senha: senha,
                }

            })
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export default alterarEstudante;
