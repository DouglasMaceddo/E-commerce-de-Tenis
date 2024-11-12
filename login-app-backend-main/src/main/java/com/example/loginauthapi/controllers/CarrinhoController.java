package com.example.loginauthapi.controllers;


import com.example.loginauthapi.Service.CarrinhoService;
import com.example.loginauthapi.domain.user.Carrinho;
import com.example.loginauthapi.domain.user.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping("/{userId}")
    public ResponseEntity<Carrinho> getCarrinho(@PathVariable Long userId) {
        Carrinho carrinho = carrinhoService.getCarrinho(userId);
        return ResponseEntity.ok(carrinho);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Carrinho> addItem(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        Carrinho carrinho = carrinhoService.addItemToCarrinho(userId, cartItem);
        return ResponseEntity.ok(carrinho);
    }

    @DeleteMapping("/{userId}/{cartItemId}")
    public ResponseEntity<Carrinho> removeItem(@PathVariable Long userId, @PathVariable Long cartItemId) {
        Carrinho carrinho = carrinhoService.removeItemFromCarrinho(userId, cartItemId);
        return ResponseEntity.ok(carrinho);
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Carrinho> clearCarrinho(@PathVariable Long userId) {
        Carrinho carrinho = carrinhoService.clearCarrinho(userId);
        return ResponseEntity.ok(carrinho);
    }
}

