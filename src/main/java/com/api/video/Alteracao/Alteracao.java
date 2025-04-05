package com.api.video.Alteracao;

import com.api.video.Cliente.Cliente;
import com.api.video.Projeto.Projeto;
import com.api.video.Task.Task;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "alteracoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alteracao {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Cliente autor;

    @Column(nullable = false)
    private String descricao;

    @Column(name = "data_alteracao", nullable = false)
    private LocalDate dataAlteracao;

    @ManyToOne
    @JoinColumn(name = "referencia_task", nullable = false)
    private Task referenciaTask;
}
