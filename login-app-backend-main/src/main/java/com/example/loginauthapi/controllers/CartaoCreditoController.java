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
        cartaoCreditoService.saveCard(cartaoCredito);
        return ResponseEntity.ok("Cartão salvo com sucesso");
    }


    @GetMapping("/buscar/{userId}")
    public ResponseEntity<List<CartaoCredito>> buscarCartoes(@PathVariable String userId) {
        List<CartaoCredito> savedCards = cartaoCreditoService.getSavedCards(userId);
        return ResponseEntity.ok(savedCards);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarCartao(@PathVariable String id) {
        cartaoCreditoService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}

