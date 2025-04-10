package com.api.video.Projeto;

import com.api.video.Projeto.DTO.ProjetoGetDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, UUID> {

    @Transactional
    @Modifying
    @Query(value = """
    INSERT INTO projetos (id, nome, descricao, data_criacao, criado_por, url_video)
    VALUES (:id, :nome, :descricao, :dataCriacao, :criadoPor, :urlVideo)
""", nativeQuery = true)
    int criarProjeto(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("descricao") String descricao,
            @Param("dataCriacao") LocalDate dataCriacao,
            @Param("criadoPor") UUID criadoPor,
            @Param("urlVideo") String urlVideo
    );

    @Transactional
    @Modifying
    @Query("""
    UPDATE Projeto p
    SET p.nome = :nome,
        p.descricao = :descricao,
        p.urlVideo = :urlVideo
    WHERE p.id = :id
""")
    int atualizarProjeto(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("descricao") String descricao,
            @Param("urlVideo") String urlVideo
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

    @Query("""
    SELECT p
    FROM Projeto p
    WHERE p.criadoPor.id = :clienteId
""")
    List<Projeto> findProjetosByCliente(@Param("clienteId") UUID clienteId);

    @Query("SELECT new com.api.video.Projeto.DTO.ProjetoGetDTO(p.descricao, p.urlVideo, p.nome) " +
            "FROM Projeto p WHERE p.id = :id AND p.criadoPor.id = :clienteId")
    Optional<ProjetoGetDTO> buscarDescricaoUrlPorProjeto(@Param("id") UUID id, @Param("clienteId") UUID clienteId);

}