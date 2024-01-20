async function BuscaTodasPublicacoesRequest(token) {
    try {
        const response = await fetch("http://localhost:8080/publicacoes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}

export default BuscaTodasPublicacoesRequest;
