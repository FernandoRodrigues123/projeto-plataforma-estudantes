package com.alunosprojeto.AlunosProjeto.Api.controller;

import com.alunosprojeto.AlunosProjeto.Api.dto.publicacao.PublicacaoDTOAtualizar;
import com.alunosprojeto.AlunosProjeto.Api.dto.publicacao.PublicacaoDTOLeitura;
import com.alunosprojeto.AlunosProjeto.domain.models.Publicacao;
import com.alunosprojeto.AlunosProjeto.services.PublicacaoService;
import com.alunosprojeto.AlunosProjeto.services.UsuarioEstudanteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/publicacoes")
public class PublicacaoController {
    @Autowired
    private PublicacaoService service;


    @PostMapping("/{login}")
    public ResponseEntity<PublicacaoDTOLeitura> publicar(@RequestBody Publicacao publicacao, @PathVariable String login) {
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloLogin(login);
        if (validacao) {
            return ResponseEntity.ok(new PublicacaoDTOLeitura(service.publicar(publicacao,login)));
        } else {
           return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<PublicacaoDTOLeitura>> buscaTodos(@PageableDefault(size = 10, sort = {"titulo"}) Pageable paginacao) {
        return ResponseEntity.ok(service.buscarTodasPublicacoes(paginacao).map(PublicacaoDTOLeitura::new));
    }


    @PutMapping("/{login}/{id}")
    public ResponseEntity<PublicacaoDTOLeitura> atualizarPublicacao(@PathVariable(name = "login") String login, @PathVariable(name = "id") Long id, @RequestBody PublicacaoDTOAtualizar dadosNovos){
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloLogin(login);
        if (validacao) {
            System.out.println(dadosNovos);
            return ResponseEntity.ok(new PublicacaoDTOLeitura(service.atualizarPublicacao(id, dadosNovos)));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{login}/{id}")
    public ResponseEntity deletarPublicacao(@PathVariable(name = "login") String login, @PathVariable(name = "id") Long id){
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloLogin(login);
        if (validacao) {
            service.deletarPublicacao(id);
            return ResponseEntity.noContent().build();

        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}
