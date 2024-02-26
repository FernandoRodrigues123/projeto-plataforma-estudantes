async function deletarEstudante(token, login, senha) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
        const response = await fetch(baseURL+"/estudantes" , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            },
            body: JSON.stringify({
                login: login,
                senha: senha
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

export default deletarEstudante;
