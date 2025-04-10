package com.api.video.Task;

import com.api.video.Cliente.Cliente;
import com.api.video.Projeto.Projeto;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnore;  // importe necessário

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Prioridade prioridade;

    @Column(nullable = true)
    private String status;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    @JsonIgnore
    private Projeto projeto;

    @Column(name = "data_criacao", nullable = false)
    private LocalDate dataCriacao;

    @Column(name = "data_entrega", nullable = false)
    private LocalDate dataEntrega;

    @ManyToOne
    @JoinColumn(name = "responsavel_id", nullable = false)
    private Cliente responsavel;
}
