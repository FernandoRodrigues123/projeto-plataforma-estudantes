package com.alunosprojeto.AlunosProjeto.Api.dto;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record EstudanteDTO(

        @NotBlank
        String nome,
        @NotBlank
        LocalDate dataDeNascimento,
        @NotBlank
        String areaDeEstudos,

        @Email
        String email,

        @NotBlank
        String senha

) {
        public EstudanteDTO(Estudante estudante) {
                this( estudante.getNome(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudos(),estudante.getEmail(),estudante.getSenha());
        }
}
