async function deletarPublicacaoRequest(token,login,id) {
    try {
        const response = await fetch("http://localhost:8080/publicacoes/"+ login + "/"+id, {
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
