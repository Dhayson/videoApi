package com.api.video.Projeto;

import com.api.video.Projeto.DTO.ProjetoDTO;
import com.api.video.Projeto.DTO.ProjetoGetDTO;
import com.api.video.Sessao.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public UUID criarProjeto(String chaveSessao, String nome, String descricao, String urlVideo) {
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
                LocalDate.now(),
                clienteId,
                urlVideo   // <-- Novo parâmetro
        );

        if (rows > 0) {
            return projetoId;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Falha ao inserir projeto.");
        }
    }


    public void editarProjeto(String chaveSessao, UUID projetoId, String nome, String descricao, String urlVideo) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        // (Opcional) Verificar se o projeto realmente pertence a este clienteIdOpt.get(), se desejar
        int updatedRows = projetoRepository.atualizarProjeto(projetoId, nome, descricao, urlVideo);
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

    @Transactional(readOnly = true)
    public List<ProjetoDTO> buscarProjetosDoUsuario(String chaveSessao) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }

        UUID clienteId = clienteIdOpt.get();
        List<Projeto> projetos = projetoRepository.findProjetosByCliente(clienteId);

        List<ProjetoDTO> dtoList = new ArrayList<>();
        for (Projeto p : projetos) {
            String nomeUsuario = (p.getCriadoPor() != null) ? p.getCriadoPor().getNome() : null;
            ProjetoDTO dto = new ProjetoDTO(
                    p.getId(),
                    p.getNome(),
                    p.getDescricao(),
                    nomeUsuario,
                    p.getUrlVideo() // <-- Atribui a nova propriedade ao DTO
            );
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Transactional(readOnly = true)
    public ProjetoGetDTO buscarDescricaoUrlPorProjeto(String chaveSessao, UUID projetoId) {
        Optional<UUID> clienteIdOpt = sessaoService.verificarSessao(chaveSessao);
        if (clienteIdOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sessão inválida ou expirada.");
        }
        UUID clienteId = clienteIdOpt.get();

        Optional<ProjetoGetDTO> dtoOpt = projetoRepository.buscarDescricaoUrlPorProjeto(projetoId, clienteId);
        return dtoOpt.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não encontrado ou acesso negado."));
    }


}
