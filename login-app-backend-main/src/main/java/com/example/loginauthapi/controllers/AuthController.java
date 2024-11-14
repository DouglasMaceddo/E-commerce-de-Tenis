package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Endereco;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.dto.LoginRequestDTO;
import com.example.loginauthapi.dto.RegisterRequestDTO;
import com.example.loginauthapi.dto.ResponseDTO;
import com.example.loginauthapi.infra.security.TokenService;
import com.example.loginauthapi.repositories.EnderecoRepository;
import com.example.loginauthapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO body) {
        Optional<User> userOptional = repository.findByEmail(body.email());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }

        User user = userOptional.get();
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        } else {
            return ResponseEntity.status(401).body("Senha incorreta.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO body) {
        // Verificar se o e-mail já está cadastrado
        Optional<User> existingUserByEmail = repository.findByEmail(body.email());
        if (existingUserByEmail.isPresent()) {
            return ResponseEntity.status(409).body("E-mail já cadastrado.");
        }

        // Verificar se o telefone já está cadastrado
        Optional<User> existingUserByTelefone = repository.findByTelefone(body.telefone());
        if (existingUserByTelefone.isPresent()) {
            return ResponseEntity.status(409).body("Telefone já cadastrado.");
        }

        // Verificar se o CPF já está cadastrado
        Optional<User> existingUserByCpf = repository.findByCpf(body.cpf());
        if (existingUserByCpf.isPresent()) {
            return ResponseEntity.status(409).body("CPF já cadastrado.");
        }

        Endereco endereco = new Endereco();
        endereco.setCep(body.cep());
        endereco.setRua(body.rua());
        endereco.setComplemento(body.complemento());
        endereco.setCidade(body.cidade());
        endereco.setEstado(body.estado());


        // Se todos os dados são válidos, podemos prosseguir com o registro
        User newUser = new User();
        newUser.setName(body.name());
        newUser.setEmail(body.email());
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setCpf(body.cpf());
        newUser.setTelefone(body.telefone());

        // Salvar o novo usuário no banco de dados
        repository.save(newUser);

        // Gerar o token para o novo usuário
        String token = tokenService.generateToken(newUser);

        // Retornar a resposta com o token e o nome do usuário
        return ResponseEntity.status(201).body(new ResponseDTO(newUser.getName(), token));
    }
}
