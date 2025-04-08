package com.api.video.Projeto.DTO;

import com.api.video.Task.Prioridade;

import java.time.LocalDate;
import java.util.UUID;

public class TaskDTO {
    public String titulo;
    public String descricao;
    public String status;
    public Prioridade prioridade;
    public UUID projeto_id;
    public LocalDate data_entrega;
    public UUID responsavel_id;


}
