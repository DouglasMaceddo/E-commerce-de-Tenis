package com.example.loginauthapi.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cep;
    private String rua;
    private String complemento;
    private String cidade;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Chave estrangeira que associa o endereço ao usuário
    private User user;
}
