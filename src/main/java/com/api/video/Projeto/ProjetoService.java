package com.api.video.Projeto;

import com.api.video.Sessao.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private SessaoService sessaoService;

    /**
     * Cria um novo projeto.
     * Utiliza o UUID do cliente retornado por verificarSessao(chaveSessao).
     */
    public UUID criarProjeto(String chaveSessao, String nome, String descricao) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID clienteId = clienteIdOpt.get();

        UUID projetoId = UUID.randomUUID();
        int rows = projetoRepository.criarProjeto(
                projetoId,
                nome,
                descricao,
                LocalDate.now(), // data de criação
                clienteId       // ID do cliente
        );

        if (rows > 0) {
            return projetoId;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Falha ao inserir projeto.");
        }
    }

    /**
     * Edita um projeto (nome e descrição).
     * Opcionalmente, você pode verificar se o clienteId da sessão
     * realmente é dono do projeto antes de atualizar.
     */
    public void editarProjeto(String chaveSessao, UUID projetoId, String nome, String descricao) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        int updatedRows = projetoRepository.atualizarProjeto(projetoId, nome, descricao);
        if (updatedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Projeto não encontrado para atualizar.");
        }
    }

    /**
     * Deleta um projeto (e, em cascata, tasks e alterações).
     * Opcionalmente, verificar se o usuário é dono.
     */
    public void deletarProjeto(String chaveSessao, UUID projetoId) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        int deletedRows = projetoRepository.deletarProjeto(projetoId);
        if (deletedRows <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Projeto não encontrado para exclusão.");
        }
    }

    public List<Projeto> buscarProjetosDoUsuario(String chaveSessao) {
        // Verifica se a sessão é válida e obtém o ID do cliente
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Sessão inválida ou expirada.");
        }
        UUID clienteId = clienteIdOpt.get();

        // Busca todos os projetos criados por este cliente
        return projetoRepository.findProjetosByCliente(clienteId);
    }
}
