package com.api.video.Projeto.DTO;

public class ProjetoGetDTO {
    private String descricao;
    private String urlVideo;
    private String titulo;

    public ProjetoGetDTO() {
    }

    public ProjetoGetDTO(String descricao, String urlVideo, String titulo) {
        this.descricao = descricao;
        this.urlVideo = urlVideo;
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUrlVideo() {
        return urlVideo;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }

    public String getTitulo() {return titulo;}

    public void setTitulo(String titulo) {this.titulo = titulo;}
}