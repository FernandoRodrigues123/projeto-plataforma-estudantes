package com.alunosprojeto.AlunosProjeto.exception;

public class EmailEmUso extends RuntimeException{
    public EmailEmUso(String msg) {
        super(msg);
    }
}
