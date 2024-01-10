package com.alunosprojeto.AlunosProjeto.domain.repository;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante,Long> {
    Estudante findByEmail(String email);

    boolean existsByEmail(String email);


    Estudante findByUsuarioEstudante(UsuarioEstudante usuarioEstudante);

    void deleteByUsuarioEstudante(UsuarioEstudante usuarioEstudante);


    boolean existsByUsuarioEstudanteLogin(String login);

    Estudante getByUsuarioEstudanteLogin(String username);
}
