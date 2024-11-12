package com.example.loginauthapi.repositories;


import com.example.loginauthapi.domain.user.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Optional<Carrinho> findByUserId(String userId);  // Alterar para String
}