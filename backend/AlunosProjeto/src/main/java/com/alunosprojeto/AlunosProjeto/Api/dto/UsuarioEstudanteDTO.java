package com.alunosprojeto.AlunosProjeto.Api.dto;

import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioEstudanteDTO(

        @NotBlank
        @NotNull
        String login,
        @NotBlank
        @NotNull
        String senha
) {
        public UsuarioEstudanteDTO(UsuarioEstudante usuarioEstudante) {
                this(usuarioEstudante.getLogin(), usuarioEstudante.getSenha());
        }
}
