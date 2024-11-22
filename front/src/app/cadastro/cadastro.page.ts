

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastroForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        cpf: ['', [Validators.required, this.cpfValidator]],
        telefone: ['', [Validators.required, this.telefoneValidator]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('senha')?.value === form.get('confirmarSenha')?.value ? null : { mismatch: true };
  }

  cpfValidator(control: any) {
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return { invalidCpf: true };
    }
    return null;
  }

  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 3) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (value.length > 7) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (value.length > 10) {
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    event.target.value = value;
    this.cadastroForm.get('cpf')?.setValue(value);
  }

  telefoneValidator(control: any) {
    const telefone = control.value.replace(/\D/g, '');
    if (telefone.length < 10 || telefone.length > 11) {
      return { invalidTelefone: true };
    }
    return null;
  }

  formatTelefone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2$3');
    } else if (value.length > 0) {
      value = value.replace(/(\d{2})(\d{0,2})/, '($1)$2');
    }
    event.target.value = value;
    this.cadastroForm.get('telefone')?.setValue(value);
  }
  cadastrar() {
    if (!this.cadastroForm.valid) {
      this.presentToast('Formulário inválido, verifique os dados!', 'danger');
      return;
    }

    const { nome, email, senha, cpf, telefone } = this.cadastroForm.value;

    this.http.post(`${environment.api_url}/auth/register`, {
      name: nome,
      email: email,
      password: senha,
      cpf: cpf,
      telefone: telefone
    }).subscribe(
      async (response: any) => {
        await this.presentToast('Registrado com sucesso!', 'success');
        this.navigateToNovaPagina();
      },
      async (error) => {
        let errorMessage = 'Ocorreu um erro inesperado.';

        if (error.status === 409) {
          // Verifica a mensagem de erro retornada pelo backend
          if (error.error === 'E-mail já cadastrado.') {
            errorMessage = 'E-mail já cadastrado.';
          } else if (error.error === 'CPF já cadastrado.') {
            errorMessage = 'CPF já cadastrado.';
          } else if (error.error === 'Telefone já cadastrado.') {
            errorMessage = 'Telefone já cadastrado.';
          } else {
            errorMessage = error.error.message || errorMessage;
          }
        }

        await this.presentToast(errorMessage, 'danger');
      }
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'top', // Posicione o toast no topo para maior visibilidade
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
  
  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}
