package com.alunosprojeto.Api.dto;

import com.alunosprojeto.domain.models.Estudante;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;

public record EstudanteDTO(

        @NotBlank
        String nome,
        @NotBlank
        LocalDate dataDeNascimento,

        @NotBlank
        String areaDeEstudos

) {
        public EstudanteDTO(Estudante estudante) {
                this( estudante.getNome(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudos());
        }
}
