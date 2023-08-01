package com.alunosprojeto.AlunosProjeto.Api.dto;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;

public record EstudanteDTO(

        @NotBlank
        String nome,
        @NotNull
        LocalDate dataDeNascimento,
        @NotBlank
        String areaDeEstudos,

        @Email
        @NotBlank
        @NotNull
        String email,

        @NotBlank
        @NotNull
        String senha

) {
        public EstudanteDTO(Estudante estudante) {
                this( estudante.getNome(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudos(),estudante.getEmail(),estudante.getSenha());
        }
}
