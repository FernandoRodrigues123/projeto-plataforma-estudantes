import './estudanteCardSemPublicacao.css'
const EstudanteCardSemPublicacao = (props) =>{
    const estudante = props.estudante
    console.log(props.estudante);
    var partesData = String(estudante.dataDeNascimento).split('-'); 
    var anoDeNascimento = parseInt(partesData[0]);
    
    var idade = new Date().getFullYear() - anoDeNascimento

    return( 
       <a href={`/perfilPublico/${estudante.id}`}>
         <div className="estudante-card-sem-publicacao">
            <h2 id="estudante-nome">{estudante.nome}</h2>
            <p id="estudante-area-de-estudos">{estudante.areaDeEstudo}</p>
            <p id='estudante-idade'> idade {idade}</p>
        </div>
       </a>
    )
}
export default EstudanteCardSemPublicacao;