package com.api.video.Task;

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
public interface TaskRepository extends JpaRepository<Task, UUID> {

    @Transactional
    @Modifying
    @Query(value = """
                   INSERT INTO tasks (id, titulo, descricao, prioridade, projeto_id, data_criacao, data_entrega, responsavel_id)
                   VALUES (:id, :titulo, :descricao, :prioridade, :projetoId, :dataCriacao, :dataEntrega, :responsavelId)
            """, nativeQuery = true)
    int criarTask(@Param("id") UUID id,
            @Param("titulo") String titulo,
            @Param("descricao") String descricao,
            @Param("prioridade") String prioridade,
            @Param("projetoId") UUID projetoId,
            @Param("dataCriacao") LocalDate dataCriacao,
            @Param("dataEntrega") LocalDate dataEntrega,
            @Param("responsavelId") UUID responsavelId);

    @Transactional
    @Modifying
    @Query("""
                   UPDATE Task t
                   SET t.descricao = :descricao,
                       t.prioridade = :prioridade,
                       t.dataEntrega = :dataEntrega
                   WHERE t.id = :id AND t.projeto.criadoPor.id = :userId
            """)
    int atualizarTask(@Param("id") UUID id,
            @Param("descricao") String descricao,
            @Param("prioridade") com.api.video.Task.Prioridade prioridade,
            @Param("dataEntrega") LocalDate dataEntrega,
            @Param("userId") UUID userId);

    @Transactional
    @Modifying
    @Query("""
                   DELETE FROM Task t
                   WHERE t.id = :id AND t.projeto.criadoPor.id = :userId
            """)
    int deletarTask(@Param("id") UUID id, @Param("userId") UUID userId);

    @Query("""
                   SELECT t
                   FROM Task t
                   WHERE t.projeto.id = :projetoId AND t.projeto.criadoPor.id = :userId
            """)
    List<Task> buscarTasksPorProjeto(@Param("projetoId") UUID projetoId, @Param("userId") UUID userId);
}
