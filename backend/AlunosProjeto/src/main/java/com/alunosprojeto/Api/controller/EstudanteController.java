package com.alunosprojeto.Api.controller;

import com.alunosprojeto.Api.dto.EstudanteDTO;
import com.alunosprojeto.Api.dto.EstudanteDTODetalhes;
import com.alunosprojeto.domain.models.Estudante;
import com.alunosprojeto.domain.repository.EstudanteRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.MessageTag;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<EstudanteDTODetalhes> cadastrarEstudante(@RequestBody @Valid EstudanteDTO dados, UriComponentsBuilder uriBuilder) {
        Estudante estudante = new Estudante(dados);
        estudanteRepository.save(estudante);

        var uri = uriBuilder.path("/estudante/{id}").buildAndExpand(estudante.getId()).toUri();

        return ResponseEntity.created(uri).body(new EstudanteDTODetalhes(estudante));

    }

    @GetMapping
    public ResponseEntity<List<EstudanteDTO>> buscarTodosEstudantes() {
        List<Estudante> estudantes = estudanteRepository.findAll();
        List<EstudanteDTO> estudanteDTO = estudantes.stream().map(EstudanteDTO::new).toList();
        return ResponseEntity.ok(estudanteDTO);
    }

    @PutMapping()
    @Transactional
    public ResponseEntity atualizarCadastroDeEstudante(@RequestBody @Valid EstudanteDTODetalhes estudanteDTO) {

        Estudante estudante = estudanteRepository.getReferenceById(estudanteDTO.id());
        estudante.atulizar(estudanteDTO);

        return ResponseEntity.ok(new EstudanteDTODetalhes(estudante));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarCadastroEstudante(@PathVariable Long id){
        Estudante estudante = estudanteRepository.getReferenceById(id);
        estudanteRepository.delete(estudante);

        return ResponseEntity.noContent().build();exe
    }

}
