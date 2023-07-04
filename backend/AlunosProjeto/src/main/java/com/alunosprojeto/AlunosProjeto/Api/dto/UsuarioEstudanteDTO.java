package com.alunosprojeto.AlunosProjeto.Api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioEstudanteDTO(
        @Email
        String login,
        @NotBlank
        String senha
) {
}
