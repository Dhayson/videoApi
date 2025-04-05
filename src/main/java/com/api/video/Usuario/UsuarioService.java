package com.api.video.Usuario;

import com.api.video.Cliente.Cliente;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<UUID> verificarLogin(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            if (user.getCliente() != null) {
                if (senha.trim().equals(user.getCliente().getSenha().trim())) {
                    return Optional.of(user.getId());
                }
            }
        }
        return Optional.empty();
    }

    public Optional<List<String>> obterInfo(UUID idUsuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findUsuarioById(idUsuario);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            List<String> informacoes = new ArrayList<>();

            if (usuario.getCliente() != null) {
                Cliente cliente = usuario.getCliente();
                informacoes.add(cliente.getNome());
                informacoes.add(cliente.getEmail());
                informacoes.add("cliente");
                informacoes.add(cliente.getCpf());
                informacoes.add(cliente.getDataDeNascimento() != null ? cliente.getDataDeNascimento().toString() : "");
                informacoes.add(cliente.getTipoCliente());
                informacoes.add(cliente.getPlataformas());
                return Optional.of(informacoes);
            }
        }
        return Optional.empty();
    }

    public boolean verifyCliente(String email) {
        return usuarioRepository.existsClienteByEmail(email);
    }

    @Transactional
    public boolean cadastrarCliente(String nome, String email, String senha, String cpf, LocalDate dataDeNascimento, String plataformas) {
        try {
            UUID idUsuario = UUID.randomUUID();
            // Insere o usuário com tipo "cliente", email e senha
            usuarioRepository.inserirUsuario(idUsuario, "cliente", email, senha);
            // Insere o cliente com os campos completos
            usuarioRepository.cadastrarClienteComUsuario(idUsuario, nome, email, senha, cpf, dataDeNascimento, "cliente", plataformas);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public boolean editarDadosCliente(String nome, String email, String senha, String cpf) {
        return usuarioRepository.editarDadosCliente(nome, email, senha, cpf) > 0;
    }

    public boolean deletarUsuario(UUID id) {
        return usuarioRepository.deletarUsuario(id) > 0;
    }
}
