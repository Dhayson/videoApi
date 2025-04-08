package com.api.video.Task;


import com.api.video.Cliente.Cliente;
import com.api.video.Projeto.Projeto;
import com.api.video.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RepositoryRestResource(exported = false)
public interface TaskRepository extends JpaRepository<Usuario, UUID> {
    @Query("""
        SELECT t.id
        FROM Task t
        WHERE t.projeto = :projeto
    """)
    List<UUID> findProjectTasks(@Param("projeto") Projeto projeto);

    @Transactional
    @Modifying
    @Query(value = """
    INSERT INTO tasks (id, titulo, descricao, status, prioridade, projeto_id, data_entrega, responsavel_id)
    VALUES (:id, :titulo, :descricao, :status, :prioridade, :projeto_id, :data_entrega, :responsavel_id)
    """, nativeQuery = true)
    void inserirTask(
            @Param("id") UUID id,
            @Param("titulo") String titulo,
            @Param("descricao") String descricao,
            @Param("status") String status,
            @Param("prioridade") Prioridade prioridade,
            @Param("projeto_id") UUID projeto_id,
            @Param("data_entrega") LocalDate data_entrega,
            @Param("responsavel_id") UUID responsavel_id
    );

    @Transactional
    @Modifying
    @Query(value = """
    UPDATE tasks
    SET status = :status
    WHERE id = :id
    """, nativeQuery = true)
    int mudarStatusTask(
            @Param("id") UUID id,
            @Param("status") String status
    );

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM tasks
        WHERE id = :id
    """, nativeQuery = true)
    int deletarTask(@Param("id") UUID id);
}
