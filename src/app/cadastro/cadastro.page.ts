import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}
