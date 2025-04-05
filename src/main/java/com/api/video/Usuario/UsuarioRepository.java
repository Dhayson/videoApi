package com.api.video.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@RepositoryRestResource(exported = false)
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    @Query("""
        SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END
        FROM Cliente a
        WHERE a.email = :email
    """)
    boolean existsClienteByEmail(@Param("email") String email);

    @Query("""
        SELECT u
        FROM Usuario u
        LEFT JOIN FETCH u.cliente
        WHERE u.id = :id
    """)
    Optional<Usuario> findUsuarioById(@Param("id") UUID id);

    @Query("""
        SELECT u
        FROM Usuario u
        LEFT JOIN FETCH u.cliente
        WHERE u.cliente.email = :email
    """)
    Optional<Usuario> findByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE cliente
        SET nome = :nome, email = :email, senha = :senha, cpf = :cpf
        WHERE email = :email
    """, nativeQuery = true)
    int editarDadosCliente(
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("senha") String senha,
            @Param("cpf") String cpf);

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM usuario
        WHERE id = :id
    """, nativeQuery = true)
    int deletarUsuario(@Param("id") UUID id);

    @Transactional
    @Modifying
    @Query(value = """
        INSERT INTO cliente (id, nome, email, senha, cpf, data_de_nascimento, tipo_cliente, plataformas)
        VALUES (:id, :nome, :email, :senha, :cpf, :dataDeNascimento, :tipoCliente, :plataformas)
    """, nativeQuery = true)
    int cadastrarClienteComUsuario(
            @Param("id") UUID id,
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("senha") String senha,
            @Param("cpf") String cpf,
            @Param("dataDeNascimento") LocalDate dataDeNascimento,
            @Param("tipoCliente") String tipoCliente,
            @Param("plataformas") String plataformas);

    @Transactional
    @Modifying
    @Query(value = """
    INSERT INTO usuario (id, tipo, mailcheck, email, senha)
    VALUES (:id, :tipo, false, :email, :senha)
""", nativeQuery = true)
    void inserirUsuario(
            @Param("id") UUID id,
            @Param("tipo") String tipo,
            @Param("email") String email,
            @Param("senha") String senha
    );
}
