package com.api.video.Projeto.DTO;

public class ProjetoGetDTO {
    private String descricao;
    private String urlVideo;

    public ProjetoGetDTO() {
    }

    public ProjetoGetDTO(String descricao, String urlVideo) {
        this.descricao = descricao;
        this.urlVideo = urlVideo;
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
}