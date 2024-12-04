package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Orders;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.dto.CreateOrderDTO;
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

    private User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Criação de um pedido - só pode ser feito por usuário autenticado
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        User user = getAuthenticatedUser();

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado.");
        }

        System.out.println("Pedido recebido: " + createOrderDTO);

        System.out.println("Dados recebidos no DTO:");
        System.out.println("Nome: " + createOrderDTO.getName());
        System.out.println("Marca: " + createOrderDTO.getMarca());
        System.out.println("Quantidade" + createOrderDTO.getQuantity());
        System.out.println("Tamanho: " + createOrderDTO.getTamanho());
        System.out.println("Valor: " + createOrderDTO.getValor());
        System.out.println("Total: " + createOrderDTO.getTotal());
        System.out.println("Descrição: " + createOrderDTO.getDescription());
        System.out.println("Imagem: " + createOrderDTO.getImageUrl());
        System.out.println("Metodo Pagamento: " + createOrderDTO.getMetodoPagamento());
        System.out.println("Data do Pedido: " + createOrderDTO.getDataPedido());
        System.out.println("Data da entrega: " + createOrderDTO.getDataEntregaEstimada());


        Orders order = new Orders();
        order.setName(createOrderDTO.getName());
        order.setMarca(createOrderDTO.getMarca());
        order.setQuantity(createOrderDTO.getQuantity());
        order.setTamanho(createOrderDTO.getTamanho());
        order.setValor(createOrderDTO.getValor());
        order.setTotal(createOrderDTO.getTotal());
        order.setDescription(createOrderDTO.getDescription());
        order.setImageUrl(createOrderDTO.getImageUrl());
        order.setMetodoPagamento(createOrderDTO.getMetodoPagamento());
        order.setDataPedido(createOrderDTO.getDataPedido());
        order.setDataEntregaEstimada(createOrderDTO.getDataEntregaEstimada());
        order.setUser(user);

        ordersRepository.save(order);

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

        order.setName(updatedOrder.getName());
        order.setMarca(updatedOrder.getMarca());
        order.setQuantity(updatedOrder.getQuantity());
        order.setTamanho(updatedOrder.getTamanho());
        order.setValor(updatedOrder.getValor());
        order.setTotal(updatedOrder.getTotal());
        order.setDescription(updatedOrder.getDescription());
        order.setImageUrl(updatedOrder.getImageUrl());
        order.setMetodoPagamento(updatedOrder.getMetodoPagamento());
        order.setDataPedido(updatedOrder.getDataPedido());
        order.setDataEntregaEstimada(updatedOrder.getDataEntregaEstimada());

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
