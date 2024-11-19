package com.example.loginauthapi.repositories;

import com.example.loginauthapi.domain.user.CartaoCredito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartaoCreditoRepository extends JpaRepository<CartaoCredito, String> {
    // Você pode adicionar métodos personalizados para buscar os cartões por userId, se necessário.
    List<CartaoCredito> findByUserId(String userId);
}

