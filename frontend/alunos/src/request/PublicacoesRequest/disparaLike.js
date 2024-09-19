async function disparaLike(publicacaoId, login, token) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
        if (token == null || token.trim() === '') {
            alert("Token vazio ou nulo");
            await new Promise(resolve => setTimeout(resolve, 0));
        } else {
            const response = await fetch(`${baseURL}/publicacoes/curtir/${publicacaoId}?login=${login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            // Se o status não for 204 e não estiver dentro do intervalo 200-299, lance um erro
            if (response.status !== 204 && !response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            // Se o status for 204, não há conteúdo, mas você pode retornar algo se necessário
            if (response.status === 204) {
                return null; // ou qualquer valor adequado para indicar sucesso sem conteúdo
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        throw error;
    }
}


export default disparaLike;
