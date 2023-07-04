package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioEstudanteServices implements UserDetailsService {
    @Autowired
    private UsuarioEstudanteRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.loadByLogin(username);
    }
}
