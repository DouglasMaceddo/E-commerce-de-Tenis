package com.example.loginauthapi.repositories;

import com.example.loginauthapi.domain.user.Endereco;
import com.example.loginauthapi.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    Optional<Endereco> findFirstByUser(User user);
}


