package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Endereco;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.infra.security.TokenService;
import com.example.loginauthapi.repositories.EnderecoRepository;
import com.example.loginauthapi.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/endereco")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService; // Serviço que valida e extrai dados do JWT

    // Método para obter o usuário autenticado
    private User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Salvar ou Atualizar Endereço
    @PostMapping
    public ResponseEntity<?> salvarOuAtualizarEndereco(@Valid @RequestBody Endereco endereco) {
        User user = getAuthenticatedUser();

        // Verificar se o usuário já tem um endereço cadastrado
        Optional<Endereco> enderecoExistente = enderecoRepository.findFirstByUser(user);

        if (enderecoExistente.isPresent()) {
            // Atualizar o endereço existente
            Endereco enderecoAtualizado = enderecoExistente.get();
            enderecoAtualizado.setCep(endereco.getCep());
            enderecoAtualizado.setBairro(endereco.getBairro());
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

    // Buscar todos os endereços do usuário
    @GetMapping
    public ResponseEntity<?> getEnderecos() {
        User user = getAuthenticatedUser();

        // Recuperar a lista de endereços do usuário
        List<Endereco> enderecos = user.getEndereco(); // Supondo que 'getEnderecos()' seja o método correto
        return ResponseEntity.ok(new ApiResponse("Endereços carregados com sucesso!", true, enderecos));
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
