async function buscaEstudante(token, login) {
    try {
        const response = await fetch("http://localhost:8080/estudantes/" + login, {
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
