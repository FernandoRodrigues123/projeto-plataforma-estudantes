package com.alunosprojeto.AlunosProjeto.Api.controller;

import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.services.EstudanteServices;
import com.alunosprojeto.AlunosProjeto.services.PublicacaoService;
import com.alunosprojeto.AlunosProjeto.services.UsuarioEstudanteServices;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicacoes")
public class PublicacaoController {
    @Autowired
    private PublicacaoService service;


    @PostMapping("/{email}")

    public ResponseEntity<Publicacao> publicar(@RequestBody Publicacao publicacao, @PathVariable String email) {
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(email);
        if (validacao) {
            return ResponseEntity.ok(service.publicar(publicacao, email));
        } else {

           return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Publicacao>> buscaTodos(@PageableDefault(size = 10, sort = {"titulo"}) Pageable paginacao) {
        return ResponseEntity.ok(service.buscarTodasPublicacoes(paginacao));
    }

}
