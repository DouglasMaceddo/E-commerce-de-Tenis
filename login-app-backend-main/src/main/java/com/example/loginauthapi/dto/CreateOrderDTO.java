package com.example.loginauthapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderDTO {
    private String name;
    private String marca;
    private Double valor;
    private String description;
    private String imageUrl;
}
