async function deletarPublicacaoRequest(token,login,id) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
        const response = await fetch(baseURL + "/publicacoes/"+ login + "/"+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
    
        
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}

export default deletarPublicacaoRequest;
