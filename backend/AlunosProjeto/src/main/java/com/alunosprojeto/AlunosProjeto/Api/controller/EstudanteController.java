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
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(dto.login(),dto.senha());
        Authentication authenticate = manager.authenticate(token);

        String tokenJWT = tokenServices.gerarToken((UsuarioEstudante) authenticate.getPrincipal());

        return ResponseEntity.ok(new TokenDTO(tokenJWT));
    }

    @GetMapping
    public ResponseEntity<List<EstudanteDTO>> buscarTodosEstudantes() {
        return ResponseEntity.ok(services.buscarTodosEstudantes());
    }

    @PutMapping()
    @Transactional
    public ResponseEntity atualizarCadastroDeEstudante(@RequestBody @Valid EstudanteDTODetalhes estudanteDTO) {
        return ResponseEntity.ok(services.atualizarCadastroDeEstudante(estudanteDTO));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarCadastroEstudante(@PathVariable Long id) {
        services.deletarCadastroEstudante(id);

        return ResponseEntity.noContent().build();
    }

}
