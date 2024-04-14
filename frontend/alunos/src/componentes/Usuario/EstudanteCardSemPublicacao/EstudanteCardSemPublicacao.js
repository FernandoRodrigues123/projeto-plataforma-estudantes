import './estudanteCardSemPublicacao.css'
const EstudanteCardSemPublicacao = (props) =>{
    const estudante = props.estudante
    var idade =  new Date().getFullYear() - estudante.dataDeNascimento.split('-')[0]

    return(
        <div className="estudante-card-sem-publicacao">
            <h2 id="estudante-nome">{estudante.nome}</h2>
            <p id="estudante-area-de-estudos">{estudante.areaDeEstudo}</p>
            <p id='estudante-idade'> idade {idade}</p>
        </div>
    )
}
export default EstudanteCardSemPublicacao;