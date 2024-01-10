package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.exception.EmailEmUsoException;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EstudanteServices {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Transactional
    public Estudante cadastrarEstudante(EstudanteDTO dados) {
        if(estudanteRepository.existsByEmail(dados.email())){
            throw new EmailEmUsoException("email ja em uso");
        } else if (estudanteRepository.existsByUsuarioEstudanteLogin(dados.usuarioEstudanteDTO().login())) {
            throw new EmailEmUsoException("login ja em uso");
        } else {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                String senhaCript = encoder.encode(dados.usuarioEstudanteDTO().senha());

                Estudante estudante = new Estudante(dados);
                estudante.getUsuarioEstudante().setSenha(senhaCript);
                estudanteRepository.save(estudante);

                return estudante;
            }
    }


    public Page<EstudanteDTODetalhes> buscarTodosEstudantes(Pageable paginacao) {
       return estudanteRepository.findAll(paginacao).map(EstudanteDTODetalhes::new);
    }

    @Transactional
    public EstudanteDTODetalhes atualizarCadastroDeEstudante(EstudanteDTODetalhes dados) {


        if(estudanteRepository.existsByEmail(dados.email())){
            throw new EmailEmUsoException("email ja em uso");
        }if(estudanteRepository.existsByUsuarioEstudanteLogin(dados.usuarioEstudanteDTO().login())){
            throw new EmailEmUsoException("email ja em uso");
        }else {
        Estudante estudante = estudanteRepository.getReferenceById(dados.id());
        estudante.atulizar(dados);

        return new EstudanteDTODetalhes(estudante);
        }
    }

    @Transactional
    public void deletarCadastroEstudante(UsuarioEstudante usuarioEstudante) { // se o jpa hibernate e mysql entenderem que o usuario estudante e um par de colunas ele vai fazer o delete pelo
                                                                                // proprio usuario estudante, caso nao devemos implementa a exclusao pelas campos referentes
        estudanteRepository.deleteByUsuarioEstudante(usuarioEstudante);
    }

    public Estudante buscarEstudantePorEmail(String email) {
        return estudanteRepository.findByEmail(email);
    }
}
