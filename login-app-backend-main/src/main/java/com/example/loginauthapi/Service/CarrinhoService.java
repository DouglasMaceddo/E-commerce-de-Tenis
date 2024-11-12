package com.example.loginauthapi.Service;

import com.example.loginauthapi.domain.user.Carrinho;
import com.example.loginauthapi.domain.user.CartItem;
import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.repositories.CarrinhoRepository;
import com.example.loginauthapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private UserRepository userRepository;

    public Carrinho getCarrinho(String userId) {  // Alterado para String
        Optional<Carrinho> carrinho = carrinhoRepository.findByUserId(userId);  // Passando String
        return carrinho.orElseGet(() -> {
            User user = userRepository.findById(userId).orElseThrow();  // Passando String
            Carrinho newCarrinho = new Carrinho(user);
            return carrinhoRepository.save(newCarrinho);
        });
    }


    public Carrinho addItemToCarrinho(Long userId, CartItem cartItem) {
        Carrinho carrinho = getCarrinho(userId);
        carrinho.addItem(cartItem);
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho removeItemFromCarrinho(Long userId, Long cartItemId) {
        Carrinho carrinho = getCarrinho(userId);
        carrinho.getItems().removeIf(item -> item.getId().equals(cartItemId));
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho clearCarrinho(Long userId) {
        Carrinho carrinho = getCarrinho(userId);
        carrinho.getItems().clear();
        return carrinhoRepository.save(carrinho);
    }
}