package com.example.loginauthapi.domain.user;

import jakarta.persistence.*;


@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tenis_id")
    private Tenis tenis;

    private int quantity;
    private double valor;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tenis getTenis() {
        return tenis;
    }

    public void setTenis(Tenis tenis) {
        this.tenis = tenis;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
