    package com.example.loginauthapi.domain.user;

    import com.fasterxml.jackson.annotation.JsonBackReference;
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
        private String bairro;
        private String rua;
        private String complemento;
        private String cidade;
        private String estado;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        @JsonBackReference  // Aqui evitamos a serialização do campo 'user' em Orders
        private User user;
    }
