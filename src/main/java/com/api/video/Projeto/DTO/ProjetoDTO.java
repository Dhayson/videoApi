package com.api.video.Projeto.DTO;

import java.util.UUID;

public class ProjetoDTO {
    private UUID id;
    private String nome;
    private String descricao;
    private String nomeUsuario; // quem criou
    private String urlVideo;    // novo campo

    // Construtor
    public ProjetoDTO(UUID id, String nome, String descricao, String nomeUsuario, String urlVideo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.nomeUsuario = nomeUsuario;
        this.urlVideo = urlVideo;
    }

    // Getters e setters...
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

    public String getUrlVideo() {
        return urlVideo;
    }
    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }
}
