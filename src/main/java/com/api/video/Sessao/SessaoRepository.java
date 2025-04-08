package com.api.video.Sessao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface SessaoRepository extends JpaRepository<Sessao, UUID> {

    @Transactional
    @Modifying
    @Query(value = """
        INSERT INTO sessao (id, id_usuario, chave_sessao, horario_login, expired)
        VALUES (:id, :idUsuario, :chaveSessao, :currentTime, false)
    """, nativeQuery = true)
    void registrarSessao(@Param("id") UUID id, @Param("idUsuario") UUID idUsuario, @Param("chaveSessao") String chaveSessao,
                         @Param("currentTime") LocalDateTime currentTime);

    @Query("""
        SELECT s.expired
        FROM Sessao s
        WHERE s.chaveSessao = :chaveSessao
    """)
    Optional<Boolean> verificarSeSessaoExpirou(@Param("chaveSessao") String chaveSessao);

    @Query("""
        SELECT s.horarioLogin
        FROM Sessao s
        WHERE s.chaveSessao = :chaveSessao
    """)
    Optional<LocalDateTime> buscarHorarioLoginPorChaveSessao(@Param("chaveSessao") String chaveSessao);

    @Query("""
        SELECT s.usuario.id
        FROM Sessao s
        WHERE s.chaveSessao = :chaveSessao
    """)
    Optional<UUID> buscarIdUsuarioPorChaveSessao(@Param("chaveSessao") String chaveSessao);

    @Transactional
    @Modifying
    @Query("""
        UPDATE Sessao s
        SET s.expired = true
        WHERE s.chaveSessao = :chaveSessao
    """)
    void marcarSessaoComoExpirada(@Param("chaveSessao") String chaveSessao);

    @Query("""
    SELECT s
    FROM Sessao s
    WHERE s.usuario.id = :idUsuario AND s.expired = false
""")
    List<Sessao> buscarSessaoValidaPorUsuario(@Param("idUsuario") UUID idUsuario);


}
