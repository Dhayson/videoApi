package com.api.video.Usuario;

import com.api.video.Sessao.SessaoService;
import com.api.video.Usuario.DTO.ClienteDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final SessaoService sessaoService;

    public UsuarioController(UsuarioService usuarioService, SessaoService sessaoService) {
        this.usuarioService = usuarioService;
        this.sessaoService = sessaoService;
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String user, @RequestParam String senha) {
        try {
            Optional<UUID> idUser = usuarioService.verificarLogin(user, senha);
            if (idUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Usuário ou senha inválidos.");
            }
            String keySessao = sessaoService.iniciarSessao(idUser.get(), user);
            return ResponseEntity.ok(keySessao);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Parâmetro inválido: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao realizar login: " + e.getMessage());
        }
    }

    @PostMapping("/cadastrocliente")
    public ResponseEntity<String> cadastroCliente(@RequestBody ClienteDTO clienteDTO) {
        try {
            if (usuarioService.verifyCliente(clienteDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Cliente já existe.");
            }

            boolean sucesso = usuarioService.cadastrarCliente(
                    clienteDTO.getNome(),
                    clienteDTO.getEmail(),
                    clienteDTO.getSenha(),
                    clienteDTO.getCpf(),
                    clienteDTO.getDataDeNascimento(),
                    clienteDTO.getPlataformas()
            );

            return sucesso
                    ? ResponseEntity.status(HttpStatus.CREATED)
                    .body("Cliente cadastrado com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar cliente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao realizar cadastro: " + e.getMessage());
        }
    }

    @GetMapping("/getinfo")
    public ResponseEntity<?> getInfo(@RequestParam String keySessao) {
        try {
            var idUser = sessaoService.verificarSessao(keySessao);
            if (idUser.isPresent()) {
                Optional<List<String>> informacoesUsuario = usuarioService.obterInfo(idUser.get());
                return informacoesUsuario.isPresent()
                        ? ResponseEntity.ok(informacoesUsuario.get())
                        : ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Usuário não encontrado.");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Sessão inválida.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter informações: " + e.getMessage());
        }
    }

    @PutMapping("/editarcliente")
    public ResponseEntity<String> editarDadosCliente(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String cpf) {
        try {
            boolean sucesso = usuarioService.editarDadosCliente(nome, email, senha, cpf);
            return sucesso
                    ? ResponseEntity.ok("Dados do cliente atualizados com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar dados do cliente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar dados: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletarconta")
    public ResponseEntity<String> deletarConta(@RequestParam String keySessao) {
        try {
            var idUser = sessaoService.verificarSessao(keySessao);
            if (idUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Sessão inválida.");
            }
            boolean sucesso = usuarioService.deletarUsuario(idUser.get());
            return sucesso
                    ? ResponseEntity.ok("Conta deletada com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao deletar conta.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar conta: " + e.getMessage());
        }
    }
}
