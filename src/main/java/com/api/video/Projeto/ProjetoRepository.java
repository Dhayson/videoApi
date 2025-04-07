package com.api.video.Projeto;

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

import com.api.video.Cliente.Cliente;

@RepositoryRestResource(exported = false)
public interface ProjetoRepository extends JpaRepository<Usuario, UUID> {

    @Query("""
        SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END
        FROM Projeto a
        WHERE a.id = :id
    """)
    boolean existsProjetoByID(@Param("id") UUID id);

    @Query("""
        SELECT a
        FROM Projeto a
        WHERE a.id = :id
    """)
    Optional<Projeto> findProjetoById(@Param("id") UUID id);

    @Query("""
        SELECT a.id
        FROM Projeto a
        WHERE a.criadoPor = :user
    """)
    List<UUID> findUserProjects(@Param("user") Cliente user);

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM projetos
        WHERE id = :id
    """, nativeQuery = true)
    int deletarProjeto(@Param("id") UUID id);


    @Transactional
    @Modifying
    @Query(value = """
    INSERT INTO projetos (id, nome, descricao, criado_por)
    VALUES (:id, :nome, :descricao, :user)
""", nativeQuery = true)
    void inserirProjeto(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("descricao") String descricao,
            @Param("user") UUID user
    );
}
