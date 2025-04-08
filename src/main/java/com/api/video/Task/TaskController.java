package com.api.video.Task;

import com.api.video.Cliente.Cliente;
import com.api.video.Projeto.DTO.TaskDTO;
import com.api.video.Projeto.Projeto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/Task")
public class TaskController {
    private final TaskRepository TaskRepository;
    public TaskController(TaskRepository TaskRepository) {
        this.TaskRepository = TaskRepository;
    }

    @PostMapping("/criarTask")
    public ResponseEntity<String> criarProjeto(@RequestBody TaskDTO TaskDTO) {
        try {
            boolean sucesso;
            try {
                UUID idTask = UUID.randomUUID();
                // Insere a task
                TaskRepository.inserirTask(
                        idTask,
                        TaskDTO.titulo,
                        TaskDTO.descricao,
                        TaskDTO.status,
                        TaskDTO.prioridade,
                        TaskDTO.projeto_id,
                        TaskDTO.data_entrega,
                        TaskDTO.responsavel_id
                );
                sucesso = true;
            } catch (Exception e) {
                e.printStackTrace();
                sucesso = false;
            }

            return sucesso
                    ? ResponseEntity.status(HttpStatus.CREATED)
                    .body("Task criado com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao criar task.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar task: " + e.getMessage());
        }
    }

    @GetMapping("/getTasksProjeto")
    public ResponseEntity<?> getTasksProjeto(@RequestParam UUID projeto_id) {
        try {
            Optional<List<UUID>> tasks;
            try {
                Projeto projeto = new Projeto();
                projeto.setId(projeto_id);
                tasks = Optional.ofNullable(TaskRepository.findProjectTasks(projeto));
            } catch (Exception e) {
                e.printStackTrace();
                tasks = Optional.empty();
            }
            return tasks.isPresent()
                    ? ResponseEntity.ok(tasks.get())
                    : ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Projeto não encontrado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter informações: " + e.getMessage());
        }
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> putStatus(@RequestParam UUID task_id, @RequestParam String status) {
        try {
            boolean success;
            try {
                success = TaskRepository.mudarStatusTask(task_id, status) > 0;
            } catch (Exception e) {
                e.printStackTrace();
                success = false;
            }
            return success
                    ? ResponseEntity.ok("Task updated")
                    : ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Task não encontrado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter informações: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletarTask")
    public ResponseEntity<String> deletarTask(@RequestParam UUID task_id) {
        try {
            boolean sucesso = TaskRepository.deletarTask(task_id) > 0;
            return sucesso
                    ? ResponseEntity.ok("Task deletada com sucesso.")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao deletar task.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar task: " + e.getMessage());
        }
    }
}
