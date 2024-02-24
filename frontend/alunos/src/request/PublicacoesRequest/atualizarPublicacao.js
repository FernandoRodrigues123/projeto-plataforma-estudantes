async function atualizarPublicacao(login, token, publicacaoID, titulo,corpo,referencia) {
    try {
        
            const response = await fetch("http://localhost:8080/publicacoes/" + login + "/"+publicacaoID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                   titulo: titulo,
                    corpo: corpo,
                    referencia:referencia
            }),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }


            const data = await response.json()
            return data;
        
    } catch (error) {
        alert(token)
        throw error;
    }
}

export default atualizarPublicacao;
