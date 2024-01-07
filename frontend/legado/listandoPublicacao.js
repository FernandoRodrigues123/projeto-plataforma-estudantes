async function buscarPublicacoes(token){
    const conexao = await fetch("https://localhost:8443/postagem",{
    headers: { "Content-type": "application/json" ,
                "Authorization": "Bearer "+ token}}
    ) 
    const conexaoJSON = await conexao.json()

    return conexaoJSON;
}//fazer antes funcionalidade de login jumento
