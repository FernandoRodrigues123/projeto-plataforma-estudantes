async function cadastroRequest(nome, dataDeNascimento, areaDeEstudo,email, login, senha) {
    try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const response = await fetch(baseURL+"/estudantes/cadastro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                nome: nome,
                dataDeNascimento: dataDeNascimento,
                areaDeEstudo: areaDeEstudo,
                email: email,
                usuario:{
                    login: login,
                    senha: senha,
                }

            }),
        });

        if (!response.ok) {
            console.log(nome + " "+ dataDeNascimento +  " "+  areaDeEstudo +" "+  email +" "+  login +" "+  senha);
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}

export default cadastroRequest;