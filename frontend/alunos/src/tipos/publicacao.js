
export const publicacao = {
    id: Number,
    titulo: '',
    corpo: '',
    referencias: '',
    estudante: {
      nome: '',
      email: '',
      dataDeNascimento: new Date(),
      areaDeEstudo: '',
    },
  };
  export const publicacaoPagina = {
    content: [publicacao],
    empty: false,
    first: false,
    last: false,
    number: Number,
    numberOfElements: Number,
    size: Number,
    sort: { empty: false, sorted: false, unsorted: false },
    totalElements: Number,
    totalPages: Number,
  };
  