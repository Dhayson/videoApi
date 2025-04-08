package com.api.video.Projeto;

import com.api.video.Projeto.DTO.ProjetoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    public static class ProjetoDTOBuilder {
        private String nome;
        private String descricao;
        private String urlVideo;

        // getters e setters
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }

        public String getDescricao() { return descricao; }
        public void setDescricao(String descricao) { this.descricao = descricao; }

        public String getUrlVideo() { return urlVideo; }
        public void setUrlVideo(String urlVideo) { this.urlVideo = urlVideo; }
    }

    @PostMapping("/criar")
    public ResponseEntity<String> criarProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @RequestBody ProjetoDTOBuilder dto) {
        UUID projetoId = projetoService.criarProjeto(
                chaveSessao,
                dto.getNome(),
                dto.getDescricao(),
                dto.getUrlVideo()  // <-- Passa para o service
        );
        return ResponseEntity.ok("Projeto criado com sucesso! ID: " + projetoId);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> editarProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id,
            @RequestBody ProjetoDTO dto) {
        projetoService.editarProjeto(
                chaveSessao,
                id,
                dto.getNome(),
                dto.getDescricao(),
                dto.getUrlVideo()  // <-- Inclui o novo campo
        );
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

    @GetMapping("/get")
    public ResponseEntity<List<ProjetoDTO>> buscarProjetosDoUsuario(
            @RequestHeader("chaveSessao") String chaveSessao
    ) {
        List<ProjetoDTO> projetos = projetoService.buscarProjetosDoUsuario(chaveSessao);
        return ResponseEntity.ok(projetos);
    }
}
