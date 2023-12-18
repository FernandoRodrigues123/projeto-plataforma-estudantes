package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.alunosprojeto.AlunosProjeto.domain.repository.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PublicacaoService {
    @Autowired
    private PublicacaoRepository repository;
    @Autowired
    private EstudanteServices estudanteServices;
    public Publicacao publicar(Publicacao publicacao, String email){
        Estudante estudante = estudanteServices.buscarEstudantePorEmail(email);
        publicacao.setEstudante(estudante);
        return repository.save(publicacao);
    }

    public Page<Publicacao> buscarTodasPublicacoes(Pageable paginacao) {
        return repository.findAll(paginacao);
    }
}
