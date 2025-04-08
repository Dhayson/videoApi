package com.api.video.Task;

import com.api.video.Projeto.Projeto;
import com.api.video.Projeto.ProjetoRepository;
import com.api.video.Sessao.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SessaoService sessaoService;

    @Autowired
    private ProjetoRepository projetoRepository; // para validar que o projeto pertence ao usuário

    public UUID criarTask(String chaveSessao, String titulo, String descricao,
                          Prioridade prioridade, UUID projetoId, LocalDate dataEntrega) {
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // Verifica se o projeto existe e se foi criado pelo usuário logado
        Optional<Projeto> projetoOpt = projetoRepository.findByIdProjeto(projetoId);
        if (projetoOpt.isEmpty() || !projetoOpt.get().getCriadoPor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado ou acesso negado.");
        }

        UUID taskId = UUID.randomUUID();
        int rows = taskRepository.criarTask(
                taskId,
                titulo,
                descricao,
                prioridade.name(), // armazena o enum como String
                projetoId,
                LocalDate.now(),
                dataEntrega,
                userId // usuário logado como responsavel
        );
        if (rows > 0) {
            return taskId;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao criar Task.");
        }
    }

    public void atualizarTask(String chaveSessao, UUID taskId,
                              String descricao, Prioridade prioridade, LocalDate dataEntrega) {
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        int updatedRows = taskRepository.atualizarTask(taskId, descricao, prioridade, dataEntrega, userId);
        if (updatedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task não encontrada ou acesso negado para atualização.");
        }
    }

    public void deletarTask(String chaveSessao, UUID taskId) {
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        int deletedRows = taskRepository.deletarTask(taskId, userId);
        if (deletedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task não encontrada ou acesso negado para exclusão.");
        }
    }

    @Transactional(readOnly = true)
    public List<Task> buscarTasksPorProjeto(String chaveSessao, UUID projetoId) {
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // Verifica se o projeto pertence ao usuário logado
        Optional<Projeto> projetoOpt = projetoRepository.findByIdProjeto(projetoId);
        if (projetoOpt.isEmpty() || !projetoOpt.get().getCriadoPor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado ou acesso negado.");
        }
        return taskRepository.buscarTasksPorProjeto(projetoId, userId);
    }
}
