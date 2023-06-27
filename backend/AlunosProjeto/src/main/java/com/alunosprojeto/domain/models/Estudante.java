package com.alunosprojeto.domain.models;

import com.alunosprojeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.Api.dto.EstudanteDTODetalhes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.management.ConstructorParameters;
import java.time.LocalDate;

@Table(name = "estudantes")
@Entity(name = "Estudante")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Estudante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private LocalDate dataDeNascimento;
    private String areaDeEstudos;

    public Estudante(EstudanteDTO estudanteDTO) {
        this.nome = estudanteDTO.nome();
        this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        this.areaDeEstudos = estudanteDTO.areaDeEstudos();
    }

    public void atulizar(EstudanteDTODetalhes estudanteDTO) {
        if(nome != null) this.nome = estudanteDTO.nome();
        if(dataDeNascimento != null) this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        if(areaDeEstudos != null) this.areaDeEstudos = estudanteDTO.areaDeEstudos();
    }
}
