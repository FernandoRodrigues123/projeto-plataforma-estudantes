package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class EstudanteServices {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private UsuarioEstudanteRepository usuarioEstudanteRepository;


    @Transactional
    public Estudante cadastrarEstudante(EstudanteDTO dados) {
        Estudante estudante = new Estudante(dados);//converto meus dados DTO para minha entidade estudantes
        estudanteRepository.save(estudante);// salvo ela

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encode = encoder.encode(dados.senha());

        UsuarioEstudante usuarioEstudante = new UsuarioEstudante();//crio uma entidade

        usuarioEstudante.setLogin(dados.email());
        usuarioEstudante.setSenha(encode);

        usuarioEstudanteRepository.save(usuarioEstudante);

        return estudante;

    }


    public List<EstudanteDTO> buscarTodosEstudantes() {
        List<Estudante> estudantes = estudanteRepository.findAll();
        List<EstudanteDTO> estudanteDTO = estudantes.stream().map(EstudanteDTO::new).toList();
        return estudanteDTO;
    }

    public Estudante buscarEstudantePorId(Long id) {
        return estudanteRepository.findById(id).get();
    }

    @Transactional
    public EstudanteDTODetalhes atualizarCadastroDeEstudante(EstudanteDTODetalhes estudanteDTO) {

        Estudante estudante = estudanteRepository.getReferenceById(estudanteDTO.id());
        estudante.atulizar(estudanteDTO);

        return new EstudanteDTODetalhes(estudante);
    }

    @Transactional
    public void deletarCadastroEstudante(Long id) {
        Estudante estudante = estudanteRepository.getReferenceById(id);
        estudanteRepository.delete(estudante);
    }

}
