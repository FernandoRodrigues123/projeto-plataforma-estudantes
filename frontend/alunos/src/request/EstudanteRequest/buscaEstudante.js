async function buscaEstudante(token, login) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
        const response = await fetch(baseURL+"/estudantes/" + login, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
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

export default buscaEstudante;
