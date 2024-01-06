package com.alunosprojeto.AlunosProjeto.Api.controller;

import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.AlunosProjeto.Api.dto.TokenDTO;
import com.alunosprojeto.AlunosProjeto.Api.dto.UsuarioEstudanteDTO;
import com.alunosprojeto.AlunosProjeto.domain.models.Estudante;
import com.alunosprojeto.AlunosProjeto.domain.models.UsuarioEstudante;
import com.alunosprojeto.AlunosProjeto.domain.repository.EstudanteRepository;
import com.alunosprojeto.AlunosProjeto.security.TokenServices;
import com.alunosprojeto.AlunosProjeto.services.EstudanteServices;
import com.alunosprojeto.AlunosProjeto.services.UsuarioEstudanteServices;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.alunosprojeto.AlunosProjeto.domain.repository.UsuarioEstudanteRepository;

import java.util.List;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {
    @Autowired
    private EstudanteServices services;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenServices tokenServices;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<EstudanteDTODetalhes> cadastrarEstudante(@RequestBody @Valid EstudanteDTO dados, UriComponentsBuilder uriBuilder) {

        Estudante estudante = services.cadastrarEstudante(dados);
        var uri = uriBuilder.path("/estudante/{id}").buildAndExpand(estudante.getId()).toUri();

        return ResponseEntity.created(uri).body(new EstudanteDTODetalhes(estudante));

    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid UsuarioEstudanteDTO dto) {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
        Authentication authenticate = manager.authenticate(token);

        String tokenJWT = tokenServices.gerarToken((UsuarioEstudante) authenticate.getPrincipal());

        return ResponseEntity.ok(new TokenDTO(tokenJWT));
    }

    @GetMapping
    public ResponseEntity<Page<EstudanteDTODetalhes>> buscarTodosEstudantes(@PageableDefault(size = 10,sort = {"nome"}) Pageable paginacao) {
        return ResponseEntity.ok(services.buscarTodosEstudantes(paginacao));
    }

    @GetMapping("/{email}")
    public ResponseEntity<EstudanteDTODetalhes> buscaPorEmail(@PathVariable String email) {
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(email);

        if (validacao) {
            Estudante estudante = services.buscarEstudantePorEmail(email);
            return ResponseEntity.ok(new EstudanteDTODetalhes(estudante));

        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @PutMapping
    @Transactional

    public ResponseEntity atualizarCadastroDeEstudante(@RequestBody @Valid EstudanteDTODetalhes estudanteDTO) {
        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(estudanteDTO.email());
        if (validacao) {
            return ResponseEntity.ok(services.atualizarCadastroDeEstudante(estudanteDTO));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @DeleteMapping("/{email}")
    @Transactional
    public ResponseEntity deletarCadastroEstudante(@PathVariable String email) {

        boolean validacao = UsuarioEstudanteServices.verificaUsuarioEstaTentandoAcessarProprioPerfilPeloEmail(email);
        if (!validacao) {
            ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        services.deletarCadastroEstudante(email);
        return ResponseEntity.noContent().build();

    }

}
