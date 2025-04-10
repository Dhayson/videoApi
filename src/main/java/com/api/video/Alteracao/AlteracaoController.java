package com.api.video.Alteracao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/alteracoes")
public class AlteracaoController {

    @Autowired
    private AlteracaoService alteracaoService;

    // DTO para criação com timestamp fornecido pelo cliente
    public static class AlteracaoCreateDTO {
        private UUID projetoId;
        private UUID taskId;
        private String descricao;
        private int timestamp;  // novo campo para receber o valor do cliente

        public UUID getProjetoId() { return projetoId; }
        public void setProjetoId(UUID projetoId) { this.projetoId = projetoId; }

        public UUID getTaskId() { return taskId; }
        public void setTaskId(UUID taskId) { this.taskId = taskId; }

        public String getDescricao() { return descricao; }
        public void setDescricao(String descricao) { this.descricao = descricao; }

        public int getTimestamp() { return timestamp; }
        public void setTimestamp(int timestamp) { this.timestamp = timestamp; }
    }


    // DTO para atualização
    public static class AlteracaoUpdateDTO {
        private String descricao;
        private LocalDate dataAlteracao;
        private UUID taskId;
        private int timestamp;  // novo campo para receber o valor do cliente

        public String getDescricao() { return descricao; }
        public void setDescricao(String descricao) { this.descricao = descricao; }

        public LocalDate getDataAlteracao() { return dataAlteracao; }
        public void setDataAlteracao(LocalDate dataAlteracao) { this.dataAlteracao = dataAlteracao; }

        public UUID getTaskId() { return taskId; }
        public void setTaskId(UUID taskId) { this.taskId = taskId; }


        public int getTimestamp() { return timestamp; }
        public void setTimestamp(int timestamp) { this.timestamp = timestamp; }
    }

    @PostMapping("/criar")
    public ResponseEntity<String> criarAlteracao(
            @RequestHeader("chaveSessao") String chaveSessao,
            @RequestBody AlteracaoCreateDTO dto) {
        UUID idAlteracao = alteracaoService.criarAlteracao(
                chaveSessao,
                dto.getProjetoId(),
                dto.getTaskId(),
                dto.getDescricao(),
                dto.getTimestamp()   // Passa o valor recebido (por exemplo, 220)
        );
        return ResponseEntity.ok("Alteração criada com sucesso! ID: " + idAlteracao);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarAlteracao(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID alteracaoId,
            @RequestBody AlteracaoUpdateDTO dto) {
        alteracaoService.atualizarAlteracao(
                chaveSessao,
                alteracaoId,
                dto.getDescricao(),
                dto.getTaskId(),
                dto.getTimestamp()
        );
        return ResponseEntity.ok("Alteração atualizada com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarAlteracao(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID alteracaoId) {
        alteracaoService.deletarAlteracao(chaveSessao, alteracaoId);
        return ResponseEntity.ok("Alteração deletada com sucesso!");
    }

    @GetMapping("/projeto/{projetoId}")
    public ResponseEntity<List<Alteracao>> buscarAlteracoesPorProjeto(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("projetoId") UUID projetoId) {
        List<Alteracao> alteracoes = alteracaoService.buscarAlteracoesPorProjeto(chaveSessao, projetoId);
        // Evitar comportamento recursivo:
        alteracoes.forEach(a -> a.setProjeto(null));
        return ResponseEntity.ok(alteracoes);
    }
}
