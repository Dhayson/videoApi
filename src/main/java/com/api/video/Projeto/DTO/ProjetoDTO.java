package com.api.video.Projeto.DTO;

import java.util.UUID;

public static class ProjetoDTO {
    private UUID id;            // id do projeto
    private String nome;        // nome do projeto
    private String descricao;   // descrição do projeto
    private String nomeUsuario; // nome do cliente que criou

    // Construtores
    public ProjetoDTO() {
    }

    public ProjetoDTO(UUID id, String nome, String descricao, String nomeUsuario) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.nomeUsuario = nomeUsuario;
    }

    // Getters e Setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }
    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }
}
