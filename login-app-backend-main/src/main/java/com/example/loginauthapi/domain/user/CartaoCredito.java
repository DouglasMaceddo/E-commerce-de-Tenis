package com.example.loginauthapi.domain.user;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
public class CartaoCredito {

    @NotNull(message = "O nome do cartão é obrigatório")
    private String cardName;

    @Pattern(regexp = "^[0-9]{16}$", message = "O número do cartão deve ter 16 dígitos")
    private String cardNumber;

    @NotNull(message = "A data de validade é obrigatória")
    private String expiryDate;

    @NotNull(message = "O CVV é obrigatório")
    @Min(value = 100, message = "O CVV deve ter 3 dígitos")
    @Max(value = 999, message = "O CVV deve ter 3 dígitos")
    private String cvv;

    // Getters e setters
}
