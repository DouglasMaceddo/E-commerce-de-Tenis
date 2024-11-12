package com.example.loginauthapi.domain.user;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    private List<CartItem> items = new ArrayList<>();

    public Carrinho() {
    }

    // Construtor, getters e setters
    public Carrinho(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void addItem(CartItem item) {
        this.items.add(item);
    }

    public void removeItem(CartItem item) {
        this.items.remove(item);
    }

    public double getTotal() {
        return items.stream().mapToDouble(item -> item.getValor() * item.getQuantity()).sum();
    }
}
