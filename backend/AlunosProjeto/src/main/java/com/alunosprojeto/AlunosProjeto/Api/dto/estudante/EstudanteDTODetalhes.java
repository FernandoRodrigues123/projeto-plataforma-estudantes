package com.alunosprojeto.AlunosProjeto.Api.dto.estudante;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EstudanteDTODetalhes(

        @NotNull
        Long id,
        String nome,

        String email,

        LocalDate dataDeNascimento,
        String areaDeEstudo,

        UsuarioEstudanteDTO usuarioEstudanteDTO

) {
    public EstudanteDTODetalhes(Estudante estudante){
        this(estudante.getId(),estudante.getNome(),estudante.getEmail(), estudante.getDataDeNascimento(), estudante.getAreaDeEstudo(),new UsuarioEstudanteDTO(estudante.getUsuarioEstudante()));
    }


}
