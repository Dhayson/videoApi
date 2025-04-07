package com.api.video.Projeto;

import com.api.video.Cliente.Cliente;
import com.api.video.Projeto.Projeto;
import com.api.video.Projeto.ProjetoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjetoService {

    private final ProjetoRepository ProjetoRepository;

    public ProjetoService(ProjetoRepository ProjetoRepository) {
        this.ProjetoRepository = ProjetoRepository;
    }

    public Optional<List<String>> obterInfo(UUID idProjeto) {
        Optional<Projeto> ProjetoOptional = ProjetoRepository.findProjetoById(idProjeto);

        if (ProjetoOptional.isPresent()) {
            Projeto Projeto = ProjetoOptional.get();
            List<String> informacoes = new ArrayList<>();

            if (Projeto.getId() != null) {
                informacoes.add(Projeto.getNome());
                informacoes.add(Projeto.getDescricao());
                informacoes.add(Projeto.getDataCriacao().format(DateTimeFormatter.ISO_DATE));
                informacoes.add(Projeto.getCriadoPor().getNome());
                informacoes.add(Projeto.getCriadoPor().getId().toString());
                return Optional.of(informacoes);
            }
        }
        return Optional.empty();
    }

    @Transactional
    public boolean adicionarProjeto(String nome, String descricao, UUID id_client) {
        try {
            UUID idProjeto = UUID.randomUUID();
            // Insere o projeto
            ProjetoRepository.inserirProjeto(idProjeto, nome, descricao, id_client);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deletarProjeto(UUID id) {
        return ProjetoRepository.deletarProjeto(id) > 0;
    }

    public Optional<List<UUID>> obterProjetosUsuario(UUID user_id) {
        try {
            UUID idProjeto = UUID.randomUUID();
            // Insere o projeto
            Cliente cliente = new Cliente();
            cliente.setId(user_id);
            return Optional.ofNullable(ProjetoRepository.findUserProjects(cliente));
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
