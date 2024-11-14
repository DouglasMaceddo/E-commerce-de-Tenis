package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Endereco;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.repositories.EnderecoRepository;
import com.example.loginauthapi.repositories.UserRepository;
import com.example.loginauthapi.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/Endereco")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @PostMapping
    public ResponseEntity<?> salvarEndereco(@RequestBody Endereco endereco, @RequestHeader("Authorization") String token) {
        // Validar o token
        String userEmail = tokenService.validateToken(token.replace("Bearer ", ""));

        if (userEmail == null) {
            return ResponseEntity.status(403).body(new ApiResponse("Token inválido ou expirado.", false));
        }

        // Encontrar o usuário pelo email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Associar o endereço ao usuário
        endereco.setUser(user);

        // Salvar o endereço no banco de dados
        enderecoRepository.save(endereco);

        return ResponseEntity.status(201).body(new ApiResponse("Endereço salvo com sucesso!", true));
    }

    @GetMapping
    public ResponseEntity<?> getEnderecos(@RequestHeader("Authorization") String token) {
        // Validar o token
        String userEmail = tokenService.validateToken(token.replace("Bearer ", ""));

        if (userEmail == null) {
            return ResponseEntity.status(403).body("Token inválido ou expirado.");
        }

        // Encontrar o usuário pelo email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Retornar os endereços do usuário
        return ResponseEntity.ok(user.getEnderecos());
    }

    // Classe ApiResponse
    public static class ApiResponse {
        private String message;
        private boolean success;

        public ApiResponse(String message, boolean success) {
            this.message = message;
            this.success = success;
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }
    }
}