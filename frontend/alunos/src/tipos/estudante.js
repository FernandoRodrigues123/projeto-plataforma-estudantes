
export const Estudante= {
      nome: '',
      email: '',
      dataDeNascimento: new Date(),
      areaDeEstudo: '',
      publicacoes: []
}
export class EstudanteSemPublicacao{
      nome
      email
      dataDeNascimento
      areaDeEstudo
      
      constructor(nome, email, dataDeNascimento, areaDeEstudo){
            this.nome = nome
            this.email = email
            this.dataDeNascimento = dataDeNascimento
            this.areaDeEstudo = areaDeEstudo
      }
}

