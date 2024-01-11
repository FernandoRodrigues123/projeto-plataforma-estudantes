package com.alunosprojeto.AlunosProjeto.Api.dto.publicacao;

import com.alunosprojeto.AlunosProjeto.Api.dto.estudante.EstudanteDTOLeitura;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;

public record PublicacaoDTOLeitura(


        String titulo,

        String corpo,
        String referencia,
        EstudanteDTOLeitura estudanteDTOLeitura
   ) {
   public PublicacaoDTOLeitura(Publicacao publicacao){
      this(publicacao.getTitulo(),publicacao.getCorpo(), publicacao.getReferencias(), new EstudanteDTOLeitura(publicacao.getEstudante()));
   }
}
