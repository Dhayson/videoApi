package com.api.video.Projeto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, UUID> {

    /**
     * Cria um novo projeto via query nativa (INSERT).
     * Retorna o número de linhas afetadas (se > 0, inseriu com sucesso).
     */
    @Transactional
    @Modifying
    @Query(value = """
        INSERT INTO projetos (id, nome, descricao, data_criacao, criado_por)
        VALUES (:id, :nome, :descricao, :dataCriacao, :criadoPor)
    """, nativeQuery = true)
    int criarProjeto(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("descricao") String descricao,
            @Param("dataCriacao") LocalDate dataCriacao,
            @Param("criadoPor") UUID criadoPor
    );

    /**
     * Atualiza o nome e a descrição de um projeto via JPQL (UPDATE).
     * Retorna o número de linhas afetadas (se > 0, atualizou).
     */
    @Transactional
    @Modifying
    @Query("""
        UPDATE Projeto p
        SET p.nome = :nome,
            p.descricao = :descricao
        WHERE p.id = :id
    """)
    int atualizarProjeto(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("descricao") String descricao
    );

    /**
     * Deleta um projeto via JPQL (DELETE).
     * Retorna o número de linhas afetadas (se > 0, deletou).
     */
    @Transactional
    @Modifying
    @Query("""
        DELETE FROM Projeto p
        WHERE p.id = :id
    """)
    int deletarProjeto(@Param("id") UUID id);

    /**
     * Exemplo caso você queira buscar explicitamente antes de editar/deletar.
     */
    @Query("""
        SELECT p
        FROM Projeto p
        WHERE p.id = :id
    """)
    Optional<Projeto> findByIdProjeto(@Param("id") UUID id);
}
