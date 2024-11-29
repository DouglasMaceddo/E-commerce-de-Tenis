package com.example.loginauthapi.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class CartaoCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Se desejar gerar automaticamente o ID
    private Long id;

    private String cardName;
    private String cardNumber;
    private String expiryDate;
    private String cvv;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}

