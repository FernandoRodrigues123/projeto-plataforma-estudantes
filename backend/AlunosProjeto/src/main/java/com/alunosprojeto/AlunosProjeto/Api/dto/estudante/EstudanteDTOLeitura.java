package com.alunosprojeto.AlunosProjeto.Api.dto.estudante;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;

import java.time.LocalDate;

public record EstudanteDTOLeitura(
        String nome,

        String email,

        LocalDate dataDeNascimento,
        String areaDeEstudo

) {
    public EstudanteDTOLeitura(Estudante estudante){
        this(estudante.getNome(),estudante.getEmail(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudo());
    }
}
