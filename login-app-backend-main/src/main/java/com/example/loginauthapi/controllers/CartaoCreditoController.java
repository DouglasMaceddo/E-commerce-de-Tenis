package com.example.loginauthapi.controllers;

import com.example.loginauthapi.Service.CartaoCreditoService;
import com.example.loginauthapi.domain.user.CartaoCredito;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/cartao")
public class CartaoCreditoController {

    @Autowired
    private CartaoCreditoService cartaoCreditoService;

    @PostMapping("/salvar")
    public ResponseEntity<String> salvarCartao(@RequestBody @Valid CartaoCredito cartaoCredito) {
        // Lógica para salvar o cartão
        return ResponseEntity.ok("Cartão salvo com sucesso");
    }

    @GetMapping("/buscar/{userId}")
    public ResponseEntity<List<CartaoCredito>> buscarCartoes(@PathVariable Long userId) {
        List<CartaoCredito> savedCards = cartaoCreditoService.getSavedCards(userId);
        return ResponseEntity.ok(savedCards);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarCartao(@PathVariable Long id) {
        cartaoCreditoService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}

