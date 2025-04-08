package com.api.video.Alteracao;

import com.api.video.Projeto.Projeto;
import com.api.video.Projeto.ProjetoRepository;
import com.api.video.Sessao.SessaoService;
import com.api.video.Task.Task;
import com.api.video.Task.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AlteracaoService {

    @Autowired
    private AlteracaoRepository alteracaoRepository;

    @Autowired
    private SessaoService sessaoService;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Cria uma nova alteração.
     */
    public UUID criarAlteracao(String chaveSessao, UUID projetoId, UUID taskId, String descricao) {
        // 1) Verifica sessão
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // 2) Verifica se o projeto existe e pertence ao usuário logado
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);
        if (projetoOpt.isEmpty() || !projetoOpt.get().getCriadoPor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado ou acesso negado.");
        }

        // 3) Verifica se a task existe e pertence ao mesmo projeto (opcional)
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isEmpty() || !taskOpt.get().getProjeto().getId().equals(projetoId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task não encontrada ou não pertence ao projeto informado.");
        }

        // 4) Cria a alteração
        UUID alteracaoId = UUID.randomUUID();
        LocalDate dataHoje = LocalDate.now();
        int rows = alteracaoRepository.criarAlteracao(
                alteracaoId,
                projetoId,
                userId,             // autor = usuário logado
                descricao,
                dataHoje,           // data_alteracao
                taskId              // referenciaTask
        );

        if (rows > 0) {
            return alteracaoId;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao criar Alteração.");
        }
    }

    /**
     * Atualiza uma alteração (ex.: descrição, data, e task de referência).
     */
    public void atualizarAlteracao(String chaveSessao, UUID alteracaoId, String descricao, LocalDate dataAlteracao, UUID taskId) {
        // 1) Verifica sessão
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // 2) Se quiser conferir se a nova task pertence ao mesmo projeto, seria preciso
        //    buscar a Alteracao -> ver qual o Projeto -> e depois conferir se a Task nova
        //    pertence a esse mesmo projeto. Depende da sua regra de negócio.
        //    Abaixo, apenas demonstramos o update no repository. A checagem adicional é opcional.

        int updatedRows = alteracaoRepository.atualizarAlteracao(
                alteracaoId,
                descricao,
                dataAlteracao,
                taskId,
                userId
        );
        if (updatedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Alteração não encontrada ou acesso negado para atualização.");
        }
    }

    /**
     * Deleta uma alteração associada a um projeto que pertence ao usuário logado.
     */
    public void deletarAlteracao(String chaveSessao, UUID alteracaoId) {
        // 1) Verifica sessão
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // 2) Deleta se o projeto for do usuário
        int deletedRows = alteracaoRepository.deletarAlteracao(alteracaoId, userId);
        if (deletedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Alteração não encontrada ou acesso negado para exclusão.");
        }
    }

    /**
     * Busca as alterações de um projeto. Usa a verificação do repositório para garantir
     * que o projeto seja do usuário logado.
     */
    public List<Alteracao> buscarAlteracoesPorProjeto(String chaveSessao, UUID projetoId) {
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        return alteracaoRepository.buscarAlteracoesPorProjeto(projetoId, userId);
    }
}
