package com.api.video.Projeto;

import com.api.video.Sessao.SessaoService;
import com.api.video.Projeto.DTO.ProjetoDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/Projeto")
public class ProjetoController {

    private final ProjetoService ProjetoService;
    private final SessaoService sessaoService;

    public ProjetoController(ProjetoService ProjetoService, SessaoService sessaoService) {
        this.ProjetoService = ProjetoService;
        this.sessaoService = sessaoService;
    }

    @PostMapping("/criarProjeto")
    public ResponseEntity<String> criarProjeto(@RequestBody ProjetoDTO projetoDTO) {
        try {
            boolean sucesso = ProjetoService.adicionarProjeto(
                    projetoDTO.nome,
                    projetoDTO.descricao,
                    projetoDTO.criadoPor
            );

            return sucesso
                    ? ResponseEntity.status(HttpStatus.CREATED)
                    .body("Projeto criado com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao criar projeto.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar projeto: " + e.getMessage());
        }
    }

    @GetMapping("/getinfo")
    public ResponseEntity<?> getInfo(@RequestParam UUID projeto_id) {
        try {
            Optional<List<String>> informacoesProjeto = ProjetoService.obterInfo(projeto_id);
            return informacoesProjeto.isPresent()
                    ? ResponseEntity.ok(informacoesProjeto.get())
                    : ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Projeto não encontrado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter informações: " + e.getMessage());
        }
    }

    @GetMapping("/getProjetosUsuario")
    public ResponseEntity<?> getUserProjetos(@RequestParam UUID user_id) {
        try {
            Optional<List<UUID>> projetos = ProjetoService.obterProjetosUsuario(user_id);
            return projetos.isPresent()
                    ? ResponseEntity.ok(projetos.get())
                    : ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Projeto não encontrado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter informações: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletarProjeto")
    public ResponseEntity<String> deletarProjeto(@RequestParam UUID projeto_id) {
        try {
            boolean sucesso = ProjetoService.deletarProjeto(projeto_id);
            return sucesso
                    ? ResponseEntity.ok("Projeto deletado com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao deletar projeto.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar projeto: " + e.getMessage());
        }
    }
}
