package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
        Estudante estudante = new Estudante(dados);//converto meus dados DTO para minha entidade estudantes
        estudanteRepository.save(estudante);// salvo ela

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // criptografando senha
        String encode = encoder.encode(dados.senha());

        UsuarioEstudante usuarioEstudante = new UsuarioEstudante();//crio uma entidade Usuario

        usuarioEstudante.setLogin(dados.email());
        usuarioEstudante.setSenha(encode);

        usuarioEstudanteRepository.save(usuarioEstudante);

        return estudante;

    }


    public List<EstudanteDTODetalhes> buscarTodosEstudantes() {
        List<Estudante> estudantes = estudanteRepository.findAll();
        List<EstudanteDTODetalhes> estudanteDTO = estudantes.stream().map(EstudanteDTODetalhes::new).toList();
        return estudanteDTO;
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
