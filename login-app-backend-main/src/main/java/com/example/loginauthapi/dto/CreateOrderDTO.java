package com.example.loginauthapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateOrderDTO {

    private String name;
    private String marca;
    private Integer quantity;
    private String tamanho;
    private Double valor;
    private Double total;
    private String description;
    private String imageUrl;
    private String metodoPagamento;
    private LocalDateTime dataPedido;
    private LocalDateTime dataEntregaEstimada;
}
