async function postLogin(login, senha) {
    const response = await fetch("http://api.unialunos:8080/estudantes/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            login: "lol3@gmail.com",
            senha: "senha"
        })
        
    })
    if(!response.ok){
        throw new Error("Não foi possivel fazer o login")
    }
    const token = await response.json();
    return token;
}

const formulario = document.querySelector("[data-formulario-login]")

async function login(evento){
    evento.preventDefault()
    const login = document.querySelector("[data-login]").value
    const senha = document.querySelector("[data-senha]").value
    try{
        const token = await postLogin(login, senha);
        console.log(token)
         }catch(e){
             alert(e)
         }
}
formulario.addEventListener("submit", evento => login(evento))