package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.CartaoCredito;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.repositories.CartaoCreditoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cartao")
@RequiredArgsConstructor
public class CartaoCreditoController {

    private final CartaoCreditoRepository cartaoCreditoRepository;


    // Método para obter o usuário autenticado
    private User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Salvar ou Atualizar Cartão de Crédito
    @PostMapping
    public ResponseEntity<?> salvarOuAtualizarCartao(@Valid @RequestBody CartaoCredito cartaoCredito) {
        User user = getAuthenticatedUser();

        // Verificar se o usuário já tem um cartão cadastrado
        Optional<CartaoCredito> cartaoExistente = cartaoCreditoRepository.findFirstByUser(user);

        if (cartaoExistente.isPresent()) {
            // Atualizar o cartão existente
            CartaoCredito cartaoAtualizado = cartaoExistente.get();
            cartaoAtualizado.setCardName(cartaoCredito.getCardName());
            cartaoAtualizado.setCardNumber(cartaoCredito.getCardNumber());
            cartaoAtualizado.setExpiryDate(cartaoCredito.getExpiryDate());
            cartaoAtualizado.setCvv(cartaoCredito.getCvv());

            // Salvar o cartão atualizado
            cartaoCreditoRepository.save(cartaoAtualizado);
            return ResponseEntity.ok(new ApiResponse("Cartão atualizado com sucesso!", true, cartaoAtualizado));
        } else {
            // Associar o novo cartão ao usuário
            cartaoCredito.setUser(user);

            // Salvar o novo cartão
            CartaoCredito novoCartao = cartaoCreditoRepository.save(cartaoCredito);
            return ResponseEntity.status(201)
                    .body(new ApiResponse("Cartão salvo com sucesso!", true, novoCartao));
        }
    }

    // Buscar todos os cartões do usuário autenticado
    @GetMapping
    public ResponseEntity<?> getCartoes() {
        User user = getAuthenticatedUser();

        // Recuperar a lista de cartões do usuário
        List<CartaoCredito> cartoes = user.getCartaoCredito();
        return ResponseEntity.ok(new ApiResponse("Cartões carregados com sucesso!", true, cartoes));
    }

    // Deletar cartão de crédito
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarCartao(@PathVariable Long id) {
        User user = getAuthenticatedUser();

        // Verificar se o cartão pertence ao usuário autenticado
        CartaoCredito cartao = cartaoCreditoRepository.findFirstByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Cartão não encontrado para o usuário"));

        // Remover o cartão
        cartaoCreditoRepository.delete(cartao);
        return ResponseEntity.ok(new ApiResponse("Cartão deletado com sucesso!", true));
    }

    // Classe ApiResponse (usada para resposta padronizada)
    public static class ApiResponse {
        private String message;
        private boolean success;
        private Object data;

        public ApiResponse(String message, boolean success) {
            this.message = message;
            this.success = success;
        }

        public ApiResponse(String message, boolean success, Object data) {
            this.message = message;
            this.success = success;
            this.data = data;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }
}
