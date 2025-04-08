package com.api.video.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // todas as rotas
                        .allowedOrigins("*") // permite qualquer origem
                        .allowedMethods("*") // permite todos os métodos (GET, POST, etc.)
                        .allowedHeaders("*") // permite todos os headers
                        .allowCredentials(false); // não exige cookies/autenticação
            }
        };
    }
}