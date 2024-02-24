async function postarPublicacao(publicacao, login, token) {
    try {
        if (token == null || token.trim() === '') {
            alert("tokn vazio ou nullo")
            await new Promise(resolve => setTimeout(resolve, 0));
        } else {
            const response = await fetch("http://localhost:8080/publicacoes/" + login, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(
                    publicacao
                ),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }


            const data = await response.json()
            return data;
        }
    } catch (error) {
        throw error;
    }
}

export default postarPublicacao;
