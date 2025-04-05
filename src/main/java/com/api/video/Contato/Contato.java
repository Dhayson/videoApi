package com.api.video.Contato;

import com.api.video.Cliente.Cliente;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "contatos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contato {

    @EmbeddedId
    private ContatoId id;

    @ManyToOne
    @MapsId("clienteId")
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;

    @ManyToOne
    @MapsId("contatoId")
    @JoinColumn(name = "contato_id", referencedColumnName = "id")
    private Cliente contato;

    @Column(name = "convite_aceito", nullable = false)
    private Boolean conviteAceito;

    @Column(name = "data_convite", nullable = false)
    private LocalDate dataConvite;
}
