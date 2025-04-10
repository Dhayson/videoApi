package com.api.video.Alteracao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AlteracaoRepository extends JpaRepository<Alteracao, UUID> {

    @Transactional
    @Modifying
    @Query(value = """
                INSERT INTO alteracoes (id, projeto_id, autor_id, descricao, data_alteracao, referencia_task, timestamp)
                VALUES (:id, :projetoId, :autorId, :descricao, :dataAlteracao, :referenciaTaskId, :timestamp)
            """, nativeQuery = true)
    int criarAlteracao(
            @Param("id") UUID id,
            @Param("projetoId") UUID projetoId,
            @Param("autorId") UUID autorId,
            @Param("descricao") String descricao,
            @Param("dataAlteracao") LocalDate dataAlteracao,
            @Param("referenciaTaskId") UUID referenciaTaskId,
            @Param("timestamp") int timestamp);

    @Transactional
    @Modifying
    @Query("""
                UPDATE Alteracao a
                SET a.descricao = :descricao,
                    a.referenciaTask.id = :taskId,
                    a.timestamp = :timestamp
                WHERE a.id = :alteracaoId
                  AND a.projeto.criadoPor.id = :userId
            """)
    int atualizarAlteracao(
            @Param("alteracaoId") UUID alteracaoId,
            @Param("descricao") String descricao,
            @Param("taskId") UUID taskId,
            @Param("timestamp") int timestamp,
            @Param("userId") UUID userId);

    @Transactional
    @Modifying
    @Query("""
                DELETE FROM Alteracao a
                WHERE a.id = :alteracaoId
                  AND a.projeto.criadoPor.id = :userId
            """)
    int deletarAlteracao(
            @Param("alteracaoId") UUID alteracaoId,
            @Param("userId") UUID userId);

    @Query("""
                SELECT a
                FROM Alteracao a
                WHERE a.projeto.id = :projetoId
                  AND a.projeto.criadoPor.id = :userId
            """)
    List<Alteracao> buscarAlteracoesPorProjeto(
            @Param("projetoId") UUID projetoId,
            @Param("userId") UUID userId);
}
