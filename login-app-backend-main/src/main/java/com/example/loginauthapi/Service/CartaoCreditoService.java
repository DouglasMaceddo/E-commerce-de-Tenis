package com.example.loginauthapi.Service;

import com.example.loginauthapi.domain.user.CartaoCredito;
import com.example.loginauthapi.repositories.CartaoCreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartaoCreditoService {

    @Autowired
    private CartaoCreditoRepository cartaoCreditoRepository;

    public CartaoCredito saveCard(CartaoCredito cartaoCredito) {
        return cartaoCreditoRepository.save(cartaoCredito);
    }

    public List<CartaoCredito> getSavedCards(Long userId) {
        return cartaoCreditoRepository.findByUserId(userId);
    }

    public void deleteCard(Long id) {
        cartaoCreditoRepository.deleteById(id);
    }
}

