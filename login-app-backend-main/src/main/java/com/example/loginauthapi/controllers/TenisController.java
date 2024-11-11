package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.Tenis;
import com.example.loginauthapi.repositories.TenisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/tenis")
public class TenisController {
    @Autowired
    private TenisRepository tenisRepository;

    @GetMapping
    public List<Tenis> getAllTenis() {
        return tenisRepository.findAll();
    }
}


