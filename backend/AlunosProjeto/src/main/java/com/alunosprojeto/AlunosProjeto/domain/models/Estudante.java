package com.alunosprojeto.AlunosProjeto.domain.models;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.Api.dto.UsuarioEstudanteDTO;
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

    @Column(name = "data_de_nascimento")
    private LocalDate dataDeNascimento;


    private String areaDeEstudo;

    @Embedded
    private UsuarioEstudante usuarioEstudante;

//    @OneToMany(mappedBy = "estudante") isso aqui deu um erro trenebrozo, e sem isso funcionou perfeitamente
//    private List<Publicacao> publicacoes;


    public Estudante(EstudanteDTO estudanteDTO) {
        this.nome = estudanteDTO.nome();
        this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        this.areaDeEstudo = estudanteDTO.areaDeEstudo();
        this.email = estudanteDTO.email();
        UsuarioEstudanteDTO usuarioEstudanteDTO = estudanteDTO.usuarioEstudanteDTO();
        this.usuarioEstudante = new UsuarioEstudante(usuarioEstudanteDTO.login(), usuarioEstudanteDTO.senha());
    }

    public void atulizar(EstudanteDTODetalhes estudanteDTO) {
        if(estudanteDTO.nome() != null) this.nome = estudanteDTO.nome();
        if(estudanteDTO.dataDeNascimento() != null) this.dataDeNascimento = estudanteDTO.dataDeNascimento();
        if(estudanteDTO.areaDeEstudo() != null) this.areaDeEstudo = estudanteDTO.areaDeEstudo();
        if(estudanteDTO.email() != null) this.email = estudanteDTO.email();
        UsuarioEstudanteDTO usuarioEstudanteDTO = estudanteDTO.usuarioEstudanteDTO();
        if(estudanteDTO.usuarioEstudanteDTO() != null) this.usuarioEstudante = new UsuarioEstudante(usuarioEstudanteDTO.login(), usuarioEstudanteDTO.senha());
    }
}
