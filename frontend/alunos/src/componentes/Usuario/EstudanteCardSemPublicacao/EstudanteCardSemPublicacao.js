import './estudanteCardSemPublicacao.css'
const EstudanteCardSemPublicacao = (props) =>{
    const estudante = props.estudante
    console.log(props.estudante);
    return( 
       <a href={`/perfilPublico/${estudante.id}`}>
         <div className="estudante-card-sem-publicacao">
            <img id='foto-perfil' src={`${estudante.urlImagem}`} alt='foto do estudante'></img>
            <h2 id="estudante-nome">{estudante.nome}</h2>
            <p id="estudante-area-de-estudos">{estudante.areaDeEstudo}</p>
         
        </div>
       </a>
    )
}
export default EstudanteCardSemPublicacao;