package com.api.video.Task.DTO;

import com.api.video.Task.Prioridade;
import com.api.video.Task.Status;


import java.time.LocalDate;
import java.util.UUID;

public class TaskDTO {
    private String titulo;
    private String descricao;
    private Prioridade prioridade;
    private LocalDate dataEntrega;
    private UUID projetoId;
    private Status status;

    // Getters e Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Prioridade getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Prioridade prioridade) {
        this.prioridade = prioridade;
    }

    public LocalDate getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDate dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public UUID getProjetoId() {
        return projetoId;
    }

    public void setProjetoId(UUID projetoId) {
        this.projetoId = projetoId;
    }


    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

}
