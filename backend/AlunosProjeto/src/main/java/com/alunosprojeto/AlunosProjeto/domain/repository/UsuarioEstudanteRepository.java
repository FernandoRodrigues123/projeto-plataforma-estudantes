package com.alunosprojeto.AlunosProjeto.domain.repository;

import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioEstudanteRepository extends JpaRepository<UsuarioEstudante, Long> {
    UserDetails loadByLogin(String username);
}
