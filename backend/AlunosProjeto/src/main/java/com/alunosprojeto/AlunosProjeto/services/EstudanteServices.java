package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;
import com.alunosprojeto.AlunosProjeto.exception.EmailEmUso;
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
        if(estudanteRepository.existsByEmail(dados.email())){
            throw new EmailEmUso("email ja em uso");
        }else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String senhaCript = encoder.encode(dados.senha());

            Estudante estudante = new Estudante(dados);
            UsuarioEstudante usuarioEstudante = new UsuarioEstudante(dados.email(), senhaCript);


            estudanteRepository.save(estudante);
            usuarioEstudanteRepository.save(usuarioEstudante);

            return estudante;
        }
    }


    public Page<EstudanteDTODetalhes> buscarTodosEstudantes(Pageable paginacao) {
       return estudanteRepository.findAll(paginacao).map(EstudanteDTODetalhes::new);
    }

    public Estudante buscarEstudantePorId(Long id) {
        return estudanteRepository.getReferenceById(id);
    }

    @Transactional
    public EstudanteDTODetalhes atualizarCadastroDeEstudante(EstudanteDTODetalhes estudanteDTO) {


        if(estudanteRepository.existsByEmail(estudanteDTO.email())){
            throw new EmailEmUso("email ja em uso");
        }else {
        Estudante estudante = estudanteRepository.getReferenceById(estudanteDTO.id());
        estudante.atulizar(estudanteDTO);

        return new EstudanteDTODetalhes(estudante);
        }
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
