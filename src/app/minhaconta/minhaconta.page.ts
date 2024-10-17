import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  infoUsuario = {
    cpf: '',
    email: '',
    nome: '',
    telefone: ''
  };

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]] // Formato: 12345-678
    });
  }
  ngOnInit() {
    // Recupera o login do usuário logado
    const usuarioLogado = localStorage.getItem('userId');
    const dadosUsuario = JSON.parse(localStorage.getItem('cadastros') || '[]');

    if (Array.isArray(dadosUsuario) && dadosUsuario.length > 0) {
      const usuario = dadosUsuario.find(user => user.login === usuarioLogado);

      if (usuario) {
        this.infoUsuario.cpf = usuario.cpf || 'CPF não disponível';
        this.infoUsuario.nome = usuario.nome || 'Nome não disponível';
        this.infoUsuario.email = usuario.login || 'Email não disponível';
        this.infoUsuario.telefone = usuario.telefone || 'Telefone não disponível';
      } else {
        console.error('Usuário logado');
      }
    } else {
      console.error('Nenhum cadastro encontrado');
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Endereço cadastrado:', this.addressForm.value);
      // Aqui você pode adicionar a lógica para salvar o endereço
    }
  }
  sairConta() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);

    this.infoUsuario = {
      cpf: '',
      email: '',
      nome: '',
      telefone: ''
    };
  }
}
