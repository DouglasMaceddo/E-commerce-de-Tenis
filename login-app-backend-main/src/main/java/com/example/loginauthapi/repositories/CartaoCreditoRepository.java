package com.example.loginauthapi.repositories;

import com.example.loginauthapi.domain.user.CartaoCredito;
import com.example.loginauthapi.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartaoCreditoRepository extends JpaRepository<CartaoCredito, Long> {
    Optional<CartaoCredito> findFirstByUser(User user);
}
