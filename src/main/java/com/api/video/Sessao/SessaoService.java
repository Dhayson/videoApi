package com.api.video.Sessao;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SessaoService {

    private final SessaoRepository sessaoRepository;

    public SessaoService(SessaoRepository sessaoRepository) {
        this.sessaoRepository = sessaoRepository;
    }

    public Optional<UUID> verificarSessao(String chaveSessao) {
        Optional<Boolean> expiredOptional = sessaoRepository.verificarSeSessaoExpirou(chaveSessao);
        if (expiredOptional.isEmpty() || expiredOptional.get()) {
            return Optional.empty();
        }
        Optional<LocalDateTime> horarioLoginOptional = sessaoRepository.buscarHorarioLoginPorChaveSessao(chaveSessao);
        if (horarioLoginOptional.isEmpty()) {
            return Optional.empty();
        }
        LocalDateTime horarioLogin = horarioLoginOptional.get();
        LocalDateTime agora = LocalDateTime.now();
        Duration diferenca = Duration.between(horarioLogin, agora);
        if (diferenca.toHours() <= 48) {
            return sessaoRepository.buscarIdUsuarioPorChaveSessao(chaveSessao);
        }
        expirarSessao(chaveSessao);
        return Optional.empty();
    }

    public void expirarSessao(String chaveSessao) {
        sessaoRepository.marcarSessaoComoExpirada(chaveSessao);
    }

    @Transactional
    public String iniciarSessao(UUID idUsuario, String mail) {
        List<Sessao> sessaoExistente = sessaoRepository.buscarSessaoValidaPorUsuario(idUsuario);
        if (sessaoExistente.size() > 0) {
            for (Sessao sessao : sessaoExistente) {
                expirarSessao(sessao.getChaveSessao());
            }
        }

        String chaveSessao = UUID.randomUUID().toString();
        UUID idSessao = UUID.randomUUID();
        sessaoRepository.registrarSessao(idSessao, idUsuario, chaveSessao, LocalDateTime.now());
        return chaveSessao;
    }

}