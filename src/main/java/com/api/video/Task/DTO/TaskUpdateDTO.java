package com.api.video.Task.DTO;

import com.api.video.Task.Prioridade;
import com.api.video.Task.Status;


import java.time.LocalDate;

public class TaskUpdateDTO {
    private String descricao;
    private Prioridade prioridade;
    private Status status;
    private LocalDate dataEntrega;

    // Getters e Setters
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


    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

}
