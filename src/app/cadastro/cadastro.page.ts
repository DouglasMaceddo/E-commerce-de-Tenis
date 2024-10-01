import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // Validação simples para 11 dígitos
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], // Validação simples para 10-11 dígitos
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  cadastrar() {
    if (this.cadastroForm.valid) {
      // Obtem os valores do formulário
      const cadastroData = this.cadastroForm.value;

      // Armazena os dados no localStorage
      localStorage.setItem('cadastro', JSON.stringify(cadastroData));

      // Você pode navegar para outra página ou mostrar uma mensagem de sucesso
      console.log('Cadastro salvo com sucesso!', cadastroData);
      this.router.navigate(['/login']);
    } else {
      console.log('Formulário inválido');
    }
  }

  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}
