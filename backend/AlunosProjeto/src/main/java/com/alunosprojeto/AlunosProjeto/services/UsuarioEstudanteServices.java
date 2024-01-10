package com.alunosprojeto.AlunosProjeto.services;


import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
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
    private EstudanteRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.getByUsuarioEstudanteLogin(username).getUsuarioEstudante();
    }
    public static boolean verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(String email){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();//pega altenticacao
        String loginUsuarioAutenticado = ((UsuarioEstudante) authentication.getPrincipal()).getLogin();//pega os dados do usuario altenticado,  e  pega o id do mesmo
        System.out.println(loginUsuarioAutenticado);
        if (email.equals(loginUsuarioAutenticado)) return true;
        else return false;
    }
    public static UsuarioEstudante pegaUsuarioEstudante(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();//pega altenticacao
       return ((UsuarioEstudante) authentication.getPrincipal());//pega os dados do usuario altenticado,  e  pega o id do mesmo

    }
}
