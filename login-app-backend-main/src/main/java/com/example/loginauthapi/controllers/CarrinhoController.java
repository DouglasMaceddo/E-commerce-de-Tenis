package com.example.loginauthapi.controllers;

import com.example.loginauthapi.Service.CarrinhoService;
import com.example.loginauthapi.domain.user.Carrinho;
import com.example.loginauthapi.domain.user.CartItem;
import com.example.loginauthapi.domain.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrinho")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public ResponseEntity<Carrinho> getCarrinho() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Carrinho carrinho = carrinhoService.getCarrinho(user.getId());
        return ResponseEntity.ok(carrinho);
    }

    @PostMapping
    public ResponseEntity<Carrinho> addItem(@RequestBody CartItem cartItem) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Carrinho carrinho = carrinhoService.addItemToCarrinho(user.getId(), cartItem);
        return ResponseEntity.ok(carrinho);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Carrinho> removeItem(@PathVariable Long cartItemId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Carrinho carrinho = carrinhoService.removeItemFromCarrinho(user.getId(), cartItemId);
        return ResponseEntity.ok(carrinho);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Carrinho> clearCarrinho() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Carrinho carrinho = carrinhoService.clearCarrinho(user.getId());
        return ResponseEntity.ok(carrinho);
    }
}
