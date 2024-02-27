async function BuscaTodasPublicacoesRequest(token,numeroPagina) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
        const response = await fetch(baseURL +"/publicacoes?page="+ numeroPagina, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        });

        if (!response.ok) {
            if(response.status === 403){
               localStorage.setItem('autenticado', false)
            }
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
