package com.example.loginauthapi.repositories;

import com.example.loginauthapi.domain.user.Orders;
import com.example.loginauthapi.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    // Método para encontrar pedidos de um usuário específico
    List<Orders> findByUser(User user);
}
