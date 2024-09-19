
const buscaTokenELogin = async () => {
        
    const token = localStorage.getItem('token')
    const login = localStorage.getItem('login')

    if (token != null && token !== '' &&  login != null && login !== '' ) {
        
        return {
            "token":token,
            "login":login
        };
        
    } else {
        console.log("Token é nulo. Aguardando 2 segundos...");
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        console.log("Continuando a execução após a espera");
       
        buscaTokenELogin();
    }   
}; 

export default buscaTokenELogin;
