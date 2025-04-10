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
    public UUID criarAlteracao(String chaveSessao, UUID projetoId, UUID taskId, String descricao, int timestamp) {
        // 1) Verifica sessão
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            System.out.println("Seção expirada criar alteração");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // 2) Verifica se o projeto pertence ao usuário logado
        Optional<Projeto> projetoOpt = projetoRepository.findById(projetoId);
        if (projetoOpt.isEmpty() || !projetoOpt.get().getCriadoPor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado ou acesso negado.");
        }

        // 4) Cria a alteração utilizando o timestamp enviado pelo cliente
        UUID alteracaoId = UUID.randomUUID();
        int rows = alteracaoRepository.criarAlteracao(
                alteracaoId,
                projetoId,
                userId,             // autor = usuário logado
                descricao,
                LocalDate.now(),    // data_alteracao
                taskId,             // referenciaTask
                timestamp           // utiliza o valor informado (ex.: 220)
        );

        if (rows > 0) {
            return alteracaoId;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao criar Alteração.");
        }
    }


    /**
     * Atualiza uma alteração (ex.: descrição, data, task e timestamp).
     */
    public void atualizarAlteracao(String chaveSessao, UUID alteracaoId, String descricao, UUID taskId, int timestamp) {
        // 1) Verifica sessão
        Optional<UUID> userIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (userIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID userId = userIdOpt.get();

        // 2) Se quiser, valide também se a nova task ainda está dentro do mesmo projeto da Alteracao
        //    Para isso, seria necessário buscar a Alteracao no BD e comparar.
        //    Abaixo, apenas chamamos o repositório.

        // 3) Atualiza o timestamp (exemplo: epoch time em segundos)
        // int currentTimestamp = (int) (System.currentTimeMillis() / 1000L);

        int updatedRows = alteracaoRepository.atualizarAlteracao(
                alteracaoId,
                descricao,
                taskId,
                timestamp,
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

        int deletedRows = alteracaoRepository.deletarAlteracao(alteracaoId, userId);
        if (deletedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Alteração não encontrada ou acesso negado para exclusão.");
        }
    }

    /**
     * Busca as alterações de um projeto. Retorna a lista de Alteracao.
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
