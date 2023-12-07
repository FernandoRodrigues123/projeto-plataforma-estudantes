package com.alunosprojeto.AlunosProjeto.Api.controller;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.alunosprojeto.AlunosProjeto.services.EstudanteServices;
import com.alunosprojeto.AlunosProjeto.services.PublicacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/publicacoes")
public class PublicacaoController {
    @Autowired
    private PublicacaoService service;


    @PostMapping("/{id}")
    public Publicacao publicar(@RequestBody Publicacao publicacao, @PathVariable Long id){
        return service.publicar(publicacao,id);
    }
}
