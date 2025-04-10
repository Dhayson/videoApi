package com.api.video.Task;

import com.api.video.Task.DTO.TaskDTO;
import com.api.video.Task.DTO.TaskUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Endpoint para criação de Task
    @PostMapping("/criar")
    public ResponseEntity<String> criarTask(
            @RequestHeader("chaveSessao") String chaveSessao,
            @RequestBody TaskDTO dto) {
        UUID taskId = taskService.criarTask(chaveSessao,
                dto.getTitulo(),
                dto.getDescricao(),
                dto.getPrioridade(),
                dto.getProjetoId(),
                dto.getDataEntrega());
        return ResponseEntity.ok("Task criada com sucesso! ID: " + taskId);
    }

    // Endpoint para atualização (apenas descricao, prioridade e dataEntrega)
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> atualizarTask(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id,
            @RequestBody TaskUpdateDTO dto) {
        taskService.atualizarTask(chaveSessao, id,
                dto.getDescricao(),
                dto.getPrioridade(),
                dto.getDataEntrega());
        return ResponseEntity.ok("Task atualizada com sucesso!");
    }

    // Endpoint para exclusão
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarTask(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id) {
        taskService.deletarTask(chaveSessao, id);
        return ResponseEntity.ok("Task deletada com sucesso!");
    }

    // Endpoint para buscar as tasks de um projeto
    @GetMapping("/projeto/{projetoId}")
    public ResponseEntity<List<Task>> buscarTasksPorProjeto(
        @RequestHeader("chaveSessao") String chaveSessao,
        @PathVariable("projetoId") UUID projetoId) {
            List<Task> tasks = taskService.buscarTasksPorProjeto(chaveSessao, projetoId);
            return ResponseEntity.ok(tasks);
        }
        
    // Endpoint para mudar o status das tasks
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> atualizarStatus(
            @RequestHeader("chaveSessao") String chaveSessao,
            @PathVariable("id") UUID id,
            @RequestBody Map<String, String> body) {
        String novoStatus = body.get("status");
        taskService.atualizarStatus(chaveSessao, id, Status.valueOf(novoStatus));
        return ResponseEntity.ok("Status atualizado com sucesso!");
}

}
