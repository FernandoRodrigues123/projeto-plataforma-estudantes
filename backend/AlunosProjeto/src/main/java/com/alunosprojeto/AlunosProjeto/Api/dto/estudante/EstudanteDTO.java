package com.alunosprojeto.AlunosProjeto.Api.dto.estudante;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EstudanteDTO(

        @NotBlank
        String nome,
        @NotNull
        LocalDate dataDeNascimento,
        @NotBlank
        String areaDeEstudo,

        @Email
        @NotBlank
        @NotNull
        String email,
        @NotNull
        @JsonAlias("usuario")
        UsuarioEstudanteDTO usuarioEstudanteDTO

) {
        public EstudanteDTO(Estudante estudante) {
                this( estudante.getNome(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudo(),estudante.getEmail(), new UsuarioEstudanteDTO(estudante.getUsuarioEstudante()));
        }


}
