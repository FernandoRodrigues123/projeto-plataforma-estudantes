package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        return repository.findByLogin(username);
    }
    public static boolean verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(String email){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();//pega altenticacao
        String loginUsuarioAutenticado = ((UsuarioEstudante) authentication.getPrincipal()).getLogin();//pega os dados do usuario altenticado,  e  pega o id do mesmo
        System.out.println(loginUsuarioAutenticado);
        if (email.equals(loginUsuarioAutenticado)) return true;
        else return false;
    }
}
