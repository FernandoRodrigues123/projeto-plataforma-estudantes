package com.alunosprojeto.AlunosProjeto.Api.dto.publicacao;

import com.alunosprojeto.AlunosProjeto.Api.dto.estudante.EstudanteDTOLeituraSemPublicacaoEUsuario;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.fasterxml.jackson.annotation.JsonProperty;

public record PublicacaoDTOLeitura(


        String titulo,

        String corpo,
        String referencia,
        @JsonProperty(value = "estudante")
        EstudanteDTOLeituraSemPublicacaoEUsuario estudanteDTOLeitura
   ) {
   public PublicacaoDTOLeitura(Publicacao publicacao){
      this(publicacao.getTitulo(),publicacao.getCorpo(), publicacao.getReferencias(),new EstudanteDTOLeituraSemPublicacaoEUsuario( publicacao.getEstudante()));
   }
}
