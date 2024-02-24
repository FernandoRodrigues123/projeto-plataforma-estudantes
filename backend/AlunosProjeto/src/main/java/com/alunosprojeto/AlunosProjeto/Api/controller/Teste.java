package com.alunosprojeto.AlunosProjeto.Api.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/teste")
public class Teste {
    @GetMapping()
    public ResponseEntity<String> teste(){
        return ResponseEntity.ok("Hello");
    }
}
