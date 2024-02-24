package com.alunosprojeto.AlunosProjeto.domain.models;

import com.alunosprojeto.AlunosProjeto.Api.dto.estudante.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.Api.dto.estudante.UsuarioEstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.publicacao.PublicacaoDTOAtualizar;
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

    public void atualizar(PublicacaoDTOAtualizar dados) {
        if(dados.titulo() != null && dados.titulo().isBlank() == false) this.titulo = dados.titulo();
        if(dados.corpo() != null  && dados.corpo().isBlank() == false) this.corpo = dados.corpo();
        if(dados.referencia() != null  && dados.referencia().isBlank() == false) this.referencias = dados.referencia();
    }


}
