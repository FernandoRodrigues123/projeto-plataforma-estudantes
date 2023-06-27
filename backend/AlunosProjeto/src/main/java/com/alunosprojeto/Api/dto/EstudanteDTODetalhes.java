package com.alunosprojeto.Api.dto;

import com.alunosprojeto.domain.models.Estudante;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EstudanteDTODetalhes(

        @NotNull
        Long id,
        String nome,

        LocalDate dataDeNascimento,
        String areaDeEstudos

) {
    public EstudanteDTODetalhes(Estudante estudante){
        this(estudante.getId(), estudante.getNome(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudos());
    }
}
