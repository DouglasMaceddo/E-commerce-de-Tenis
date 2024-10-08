import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required,]],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('senha')?.value === form.get('confirmarSenha')?.value ? null : { mismatch: true };
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
  formatTelefone(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length > 10) {
      value = value.slice(0, 11); // Limita a 11 dígitos
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
    if (this.cadastroForm.valid) {
      const cadastroData = this.cadastroForm.value;
      let existingCadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');
      if (!Array.isArray(existingCadastros)) {
        console.error('Dados do localStorage não são um array. Inicializando como um array vazio.');
        existingCadastros = [];
      }
      existingCadastros.push(cadastroData);
      localStorage.setItem('cadastros', JSON.stringify(existingCadastros));
      await this.presentToast('Cadastro salvo com sucesso!', 'success');
      this.router.navigate(['/login']);
    } else {
      await this.presentToast('Formulário inválido, verifique os dados!', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Tempo que o toast ficará visível
      color: color, // Cor do toast
      position: 'bottom', // Posição do toast na tela
      cssClass: 'custom-toast', // Classe CSS para personalização adicional
    });
    await toast.present();
  }
  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}