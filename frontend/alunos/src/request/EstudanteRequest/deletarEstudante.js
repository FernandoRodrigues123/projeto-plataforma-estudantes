async function deletarEstudante(token, login, senha) {
    try {
        const response = await fetch("http://localhost:8080/estudantes" , {
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
