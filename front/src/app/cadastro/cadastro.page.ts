

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
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

  async cadastrar() {
    if (!this.cadastroForm.valid) {
        return await this.presentToast('Formulário inválido, verifique os dados!', 'danger');
    }

    const { nome, email, senha, cpf, telefone } = this.cadastroForm.value;
    
    try {
        const response = await fetch(`${environment.api_url}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nome,            // "valor_do_nome"
                email: email,          // "valor_do_email"
                password: senha,       // "valor_da_senha"
                cpf: cpf,              // "valor_do_cpf"
                telefone: telefone     // "valor_do_telefone"
            })
        });

        const message = response.ok
            ? 'Registrado com sucesso'
            : `Erro no registro: ${await response.json().then(err => err.message || 'Verifique os dados e tente novamente')}`;

        await this.presentToast(message, response.ok ? 'success' : 'danger');
        this.router.navigate(['/login']);
    } catch (error) {
        console.error('Erro ao registrar:', error);
        await this.presentToast('Erro inesperado! Tente novamente', 'danger');
    }
}


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}
