import deletarPublicacaoRequest from "../../../request/PublicacoesRequest/deletarPublicacaoRequest"

const DeletarPublicacao = (token, login, id) => {
    
    const mensagemDeComfirmação = "estou ciente de minha ação"
    const msg = "você esta excluindo uma de suas publicacoes. Confirme digitando '" +mensagemDeComfirmação +"'"
    const comfirmacao = prompt(msg)
    if(mensagemDeComfirmação ===  comfirmacao){
        deletarPublicacaoRequest(token, login, id)
        window.location.reload();
    }else {
        if(window.confirm("Deseja tentar novamente?")) {
           DeletarPublicacao(token, login, id)
        }
    }
}
export default DeletarPublicacao;   