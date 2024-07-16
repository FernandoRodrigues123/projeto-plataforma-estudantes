
export const Estudante= {
      nome: '',
      urlImagem:'',
      email: '',
      dataDeNascimento: new Date(),
      areaDeEstudo: '',
      publicacoes: []
}
export class EstudanteSemPublicacao{
      nome
      urlImagem
      email
      dataDeNascimento
      areaDeEstudo
      
      constructor(nome, email, dataDeNascimento, areaDeEstudo,urlImagem){
            this.nome = nome
            this.urlImagem = urlImagem
            this.email = email
            this.dataDeNascimento = dataDeNascimento
            this.areaDeEstudo = areaDeEstudo
      }
}

