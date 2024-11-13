package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Orders;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.dto.ResponseDTO;
import com.example.loginauthapi.repositories.OrdersRepository;
import com.example.loginauthapi.repositories.UserRepository;
import com.example.loginauthapi.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrdersController {

    private final OrdersRepository ordersRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService; // Serviço que valida e extrai dados do JWT

    // Criação de um pedido - só pode ser feito por usuário autenticado
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Orders order) {
        // Recuperar o usuário autenticado diretamente do SecurityContextHolder
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        order.setUser(user); // Relacionando o pedido ao usuário autenticado
        ordersRepository.save(order); // Salvando o pedido no banco

        return ResponseEntity.status(201).body(new ResponseDTO(user.getName(), "Pedido criado com sucesso."));
    }

    // Listar todos os pedidos do usuário autenticado
    @GetMapping
    public ResponseEntity<?> getUserOrders() {
        // Recuperar o usuário autenticado diretamente do SecurityContextHolder
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        List<Orders> orders = ordersRepository.findByUser(user); // Recuperar pedidos do usuário autenticado
        return ResponseEntity.ok(orders);
    }

    // Consultar um pedido específico
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId) {
        // Recuperar o usuário autenticado diretamente do SecurityContextHolder
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        Optional<Orders> orderOptional = ordersRepository.findById(orderId);

        if (orderOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Pedido não encontrado.");
        }

        Orders order = orderOptional.get();
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Você não tem permissão para acessar este pedido.");
        }

        return ResponseEntity.ok(order);
    }

    // Atualizar um pedido
    @PutMapping("/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody Orders updatedOrder) {
        // Recuperar o usuário autenticado diretamente do SecurityContextHolder
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        Optional<Orders> orderOptional = ordersRepository.findById(orderId);

        if (orderOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Pedido não encontrado.");
        }

        Orders order = orderOptional.get();
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Você não tem permissão para atualizar este pedido.");
        }

        // Atualizando os campos do pedido
        order.setName(updatedOrder.getName());
        order.setMarca(updatedOrder.getMarca());
        order.setValor(updatedOrder.getValor());
        order.setDescription(updatedOrder.getDescription());
        order.setImageUrl(updatedOrder.getImageUrl());
        ordersRepository.save(order);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "Pedido atualizado com sucesso."));
    }

    // Excluir um pedido
    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        // Recuperar o usuário autenticado diretamente do SecurityContextHolder
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        Optional<Orders> orderOptional = ordersRepository.findById(orderId);

        if (orderOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Pedido não encontrado.");
        }

        Orders order = orderOptional.get();
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Você não tem permissão para excluir este pedido.");
        }

        ordersRepository.delete(order);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "Pedido excluído com sucesso."));
    }
}
