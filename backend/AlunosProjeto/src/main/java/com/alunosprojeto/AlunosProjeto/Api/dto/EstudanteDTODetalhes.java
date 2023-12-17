package com.alunosprojeto.AlunosProjeto.Api.dto;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EstudanteDTODetalhes(

        @NotNull
        Long id,
        String nome,

        String email,

        LocalDate dataDeNascimento,
        String areaDeEstudos

) {
    public EstudanteDTODetalhes(Estudante estudante){
        this(estudante.getId(),estudante.getNome(),estudante.getEmail(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudos());
    }
}
