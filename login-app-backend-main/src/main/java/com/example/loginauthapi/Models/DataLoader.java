package com.example.loginauthapi.Models;

import com.example.loginauthapi.domain.user.Tenis;
import com.example.loginauthapi.repositories.TenisRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(TenisRepository tenisRepository) {
        return args -> {
            if (tenisRepository.count() == 0) { // Verifica se o banco já possui dados
                tenisRepository.saveAll(List.of(
                        new Tenis(null, "Tênis Adidas", "Adidas", 250.99, "Tenis de andar", "/assets/Imagens Tenis/Adidas1.jpg"),
                        new Tenis(null, "Tênis Adidas", "Adidas", 309.99, "Tenis de andar", "/assets/Imagens Tenis/Adidas2.jpg"),
                        new Tenis(null, "Tênis Nike", "Nike", 260.89, "Ideal para corrida", "/assets/Imagens Tenis/Nike2.jpg"),
                        new Tenis(null, "Tênis Nike", "Nike", 549.89, "Tenis de corrida", "/assets/Imagens Tenis/Nike1.jpg"),
                        new Tenis(null, "Tênis Nike", "Nike", 290.99, "saidinha", "assets/Imagens Tenis/Nike3.jpg"),
                        new Tenis(null, "Tênis Oakley", "Oakley", 329.89, "sair pra andar", "assets/Imagens Tenis/Oakley1.jpg"),
                        new Tenis(null, "Tênis Mizuno", "Mizuno", 999.99, "sair", "assets/Imagens Tenis/Mizuno.jpg"),
                        new Tenis(null, "Tênis Oakley", "Oakley", 529.89, "sair pra andar", "assets/Imagens Tenis/Oakley2.jpg"),
                        new Tenis(null, "Tênis Olympikus", "Olympikus", 349.99, "sair pra andar", "assets/Imagens Tenis/Olympikus1.jpg"),
                        new Tenis(null, "Tênis Fyer Runner", "Puma", 199.99, "Sair pra Experimente o conforto e desempenho do Tênis", "assets/Imagens Tenis/Puma.jpg"),
                        new Tenis(null, "Tênis Olympikus", "Olympikus", 249.99, "Conforto e Elegancia", "assets/Imagens Tenis/Olympikus.jpg"),
                        new Tenis(null, "Tênis Air Max", "Nike", 329.99, "sair pra andar", "assets/Imagens Tenis/Nike.jpg")

                ));
            }
        };
    }
}

