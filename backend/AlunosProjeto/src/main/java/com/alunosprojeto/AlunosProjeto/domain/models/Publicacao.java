package com.alunosprojeto.AlunosProjeto.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "publicacao")
@Entity(name = "Publicacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String corpo;
    private String referencias;
    @ManyToOne
    @JoinColumn(name = "estudante_id", nullable = false)
    private Estudante estudante;
}
