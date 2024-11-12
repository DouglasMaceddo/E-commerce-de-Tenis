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

    public Carrinho getCarrinho(String userId) {  // userId como String
        Optional<Carrinho> carrinho = carrinhoRepository.findByUserId(userId);  // userId como String
        return carrinho.orElseGet(() -> {
            User user = userRepository.findById(userId).orElseThrow();  // userId como String
            Carrinho newCarrinho = new Carrinho(user);
            return carrinhoRepository.save(newCarrinho);
        });
    }

    public Carrinho addItemToCarrinho(String userId, CartItem cartItem) {  // userId como String
        Carrinho carrinho = getCarrinho(userId);
        carrinho.addItem(cartItem);
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho removeItemFromCarrinho(String userId, Long cartItemId) {  // userId como String
        Carrinho carrinho = getCarrinho(userId);
        carrinho.getItems().removeIf(item -> item.getId().equals(cartItemId));
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho clearCarrinho(String userId) {  // userId como String
        Carrinho carrinho = getCarrinho(userId);
        carrinho.getItems().clear();
        return carrinhoRepository.save(carrinho);
    }
}
