package com.alunosprojeto.AlunosProjeto.Api.dto.publicacao;

import jakarta.validation.constraints.NotBlank;

public record PublicacaoDTOAtualizar(
        @NotBlank
        String titulo,

        @NotBlank
        String corpo,
        String referencia
        ) {
}
