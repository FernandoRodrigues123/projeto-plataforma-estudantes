async function loginRequest(login, senha) {
    try {
        const response = await fetch("https://localhost:8443/estudantes/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                login: login,
                senha: senha,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}

export default loginRequest;
