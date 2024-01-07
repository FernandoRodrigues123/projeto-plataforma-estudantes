package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudanteServices {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private UsuarioEstudanteRepository usuarioEstudanteRepository;


    @Transactional
    public Estudante cadastrarEstudante(EstudanteDTO dados) {

        Estudante estudante = new Estudante(dados);
        estudanteRepository.save(estudante);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encode = encoder.encode(dados.senha());

        UsuarioEstudante usuarioEstudante = new UsuarioEstudante();

        usuarioEstudante.setLogin(dados.email());
        usuarioEstudante.setSenha(encode);

        usuarioEstudanteRepository.save(usuarioEstudante);

        return estudante;

    }


    public Page<EstudanteDTODetalhes> buscarTodosEstudantes(Pageable paginacao) {
       return estudanteRepository.findAll(paginacao).map(EstudanteDTODetalhes::new);
    }

    public Estudante buscarEstudantePorId(Long id) {
        return estudanteRepository.getReferenceById(id);
    }

    @Transactional
    public EstudanteDTODetalhes atualizarCadastroDeEstudante(EstudanteDTODetalhes estudanteDTO) {

        Estudante estudante = estudanteRepository.getReferenceById(estudanteDTO.id());
        estudante.atulizar(estudanteDTO);

        return new EstudanteDTODetalhes(estudante);
    }

    @Transactional
    public void deletarCadastroEstudante(String email) {
        Estudante estudante = estudanteRepository.findByEmail(email);
        estudanteRepository.delete(estudante);
    }

    public Estudante buscarEstudantePorEmail(String email) {
        return estudanteRepository.findByEmail(email);
    }
}
