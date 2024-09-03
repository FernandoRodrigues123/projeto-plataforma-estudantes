package com.alunosprojeto.AlunosProjeto.services;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.Like;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.LikeRepository;
import com.alunosprojeto.AlunosProjeto.domain.repository.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private PublicacaoRepository publicacaoRepository;

    public Publicacao curtirPublicacao(Long idPublicacao, String login){
        if(publicacaoRepository.existsById(idPublicacao)){
            Publicacao pub = publicacaoRepository.getReferenceById(idPublicacao);
            Like like = new Like(pub, estudanteRepository.getByUsuarioEstudanteLogin(login));
           likeRepository.save(like);
           return pub;
        }else{
            throw new RuntimeException("publicacao nao encontrada");
        }
    }

    public List<Estudante> buscaEstudantesLikes(Long id) {

        List<Estudante> estudantes = new ArrayList<>();

        List<Like> likes = likeRepository.findAllByPublicacaoId(id);
        likes.stream().forEach(like -> {
           estudantes.add(like.getEstudante());
        });
        return estudantes;
    }
}
