package com.api.video.Projeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    /**
     * DTO simples para receber dados de criação/edição do projeto
     */
    public static class ProjetoDTO {
        private String nome;
        private String descricao;

        // Getters e Setters
        public String getNome() {
            return nome;
        }
        public void setNome(String nome) {
            this.nome = nome;
        }
        public String getDescricao() {
            return descricao;
        }
        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }
    }

    /**
     * Cria um projeto novo.
     * Exemplo de requisição:
     *  POST /projetos
     *  Header: chaveSessao=...
     *  Body JSON: { "nome": "...", "descricao": "..." }
     */
    @PostMapping("/criar")
    public ResponseEntity<String> criarProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @RequestBody ProjetoDTO dto) {
        UUID projetoId = projetoService.criarProjeto(chaveSessao, dto.getNome(), dto.getDescricao());
        return ResponseEntity.ok("Projeto criado com sucesso! ID: " + projetoId);
    }

    /**
     * Edita o nome e descrição de um projeto.
     * Exemplo de requisição:
     *  PUT /projetos/{id}
     *  Header: chaveSessao=...
     *  Body JSON: { "nome": "...", "descricao": "..." }
     */
    @PutMapping("/{id}")
    public ResponseEntity<String> editarProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id,
            @RequestBody ProjetoDTO dto) {
        projetoService.editarProjeto(chaveSessao, id, dto.getNome(), dto.getDescricao());
        return ResponseEntity.ok("Projeto atualizado com sucesso!");
    }

    /**
     * Deleta um projeto e suas associações (tasks, alterações, etc).
     * Exemplo de requisição:
     *  DELETE /projetos/{id}
     *  Header: chaveSessao=...
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id) {
        projetoService.deletarProjeto(chaveSessao, id);
        return ResponseEntity.ok("Projeto deletado com sucesso!");
    }
}
