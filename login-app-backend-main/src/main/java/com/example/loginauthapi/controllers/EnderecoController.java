package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Endereco;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.repositories.EnderecoRepository;
import com.example.loginauthapi.repositories.UserRepository;
import com.example.loginauthapi.infra.security.TokenService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Data
@RestController
@RequestMapping("/user/endereco")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @PostMapping
    public ResponseEntity<ApiResponse> salvarOuAtualizarEndereco(
            @Valid @RequestBody Endereco endereco,
            @RequestHeader("Authorization") String token) {
        // Validar o token
        String userEmail = tokenService.validateToken(token.replace("Bearer ", ""));
        if (userEmail == null) {
            return ResponseEntity.status(403).body(new ApiResponse("Token inválido ou expirado.", false));
        }

        // Encontrar o usuário pelo email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Verificar se o usuário já tem um endereço cadastrado
        Optional<Endereco> enderecoExistente = enderecoRepository.findFirstByUser(user);

        if (enderecoExistente.isPresent()) {
            // Atualizar o endereço existente
            Endereco enderecoAtualizado = enderecoExistente.get();
            enderecoAtualizado.setCep(endereco.getCep());
            enderecoAtualizado.setRua(endereco.getRua());
            enderecoAtualizado.setComplemento(endereco.getComplemento());
            enderecoAtualizado.setCidade(endereco.getCidade());
            enderecoAtualizado.setEstado(endereco.getEstado());

            // Salvar o endereço atualizado
            enderecoRepository.save(enderecoAtualizado);

            return ResponseEntity.ok(new ApiResponse("Endereço atualizado com sucesso!", true, enderecoAtualizado));
        } else {
            // Associar o novo endereço ao usuário
            endereco.setUser(user);

            // Salvar o novo endereço no banco de dados
            Endereco novoEndereco = enderecoRepository.save(endereco);

            return ResponseEntity.status(201)
                    .body(new ApiResponse("Endereço salvo com sucesso!", true, novoEndereco));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getEnderecos(@RequestHeader("Authorization") String token) {
        // Validar o token
        String userEmail = tokenService.validateToken(token.replace("Bearer ", ""));
        if (userEmail == null) {
            return ResponseEntity.status(403).body(new ApiResponse("Token inválido ou expirado.", false));
        }

        // Encontrar o usuário pelo email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Retornar os endereços do usuário
        return ResponseEntity.ok(new ApiResponse("Endereços carregados com sucesso!", true, user.getEnderecos()));
    }

    // Classe ApiResponse
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
    }
}
