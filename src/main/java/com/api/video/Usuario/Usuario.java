package com.api.video.Usuario;

import com.api.video.Cliente.Cliente;
import com.api.video.Sessao.Sessao;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import java.util.List;
import java.util.UUID;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario", schema = "public")
@Schema(description = "Representa um usuário no sistema.")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Usuario {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
    private UUID id;

    @ToString.Include
    @Column(nullable = false)
    @Schema(description = "Tipo do usuário (ex: CLIENTE).", example = "CLIENTE")
    private String tipo;

    @Column(name = "mailcheck", nullable = false)
    private Boolean mailcheck;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, optional = true)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    @Schema(description = "Associação com a tabela cliente")
    private Cliente cliente;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Schema(description = "Associação com a tabela SESSAO. Um usuário pode ter várias sessões.")
    private List<Sessao> sessoes;
}
