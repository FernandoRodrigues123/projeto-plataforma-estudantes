async function alterarEstudante(token, loginAuth, nome, dataDeNascimento, areaDeEstudo, email, login, senha) {
    try {
        const response = await fetch("http://localhost:8080/estudantes/" + loginAuth, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nome: nome,
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
