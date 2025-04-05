package com.api.video.Contato;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ContatoId implements Serializable {
    private UUID clienteId;
    private UUID contatoId;
}
