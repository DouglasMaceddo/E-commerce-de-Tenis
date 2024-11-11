package com.example.loginauthapi.repositories;

import com.example.loginauthapi.domain.user.Tenis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenisRepository extends JpaRepository<Tenis, Long> {
}

