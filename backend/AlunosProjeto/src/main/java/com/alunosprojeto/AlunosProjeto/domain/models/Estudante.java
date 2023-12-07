package com.alunosprojeto.AlunosProjeto.domain.models;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;
import java.util.List;

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
    private String email;
    private String senha;
    @Column(name = "data_de_nascimento")
    private LocalDate dataDeNascimento;
    @Column(name = "area")
    private String areaDeEstudos;

//    @OneToMany(mappedBy = "estudante") isso aqui deu um erro trenebrozo, e sem isso funcionou perfeitamente
//    private List<Publicacao> publicacoes;


    public Estudante(EstudanteDTO estudanteDTO) {
        this.nome = estudanteDTO.nome();
        this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        this.areaDeEstudos = estudanteDTO.areaDeEstudos();
        this.senha = estudanteDTO.senha();
        this.email = estudanteDTO.email();
    }

    public void atulizar(EstudanteDTODetalhes estudanteDTO) {
        if(nome != null) this.nome = estudanteDTO.nome();
        if(dataDeNascimento != null) this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        if(areaDeEstudos != null) this.areaDeEstudos = estudanteDTO.areaDeEstudos();
    }
}
