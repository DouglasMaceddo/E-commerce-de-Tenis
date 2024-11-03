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
        cpf: ['', [Validators.required, this.cpfValidator]],
        telefone: ['', [Validators.required, this.telefoneValidator]],
        login: ['', Validators.required],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    }
    
    passwordMatchValidator(form: FormGroup) {
      return form.get('senha')?.value === form.get('confirmarSenha')?.value ? null : { mismatch: true };
    }

  cpfValidator(control: any) {
    const cpf = control.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) {
      return { invalidCpf: true }; // Validação falha se não tiver 11 dígitos
    }
    return null; // CPF válido
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
      return { invalidTelefone: true }; // Validação falha se não estiver entre 10 e 11 dígitos
    }
    return null; // Telefone válido
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
    if (this.cadastroForm.valid) {
      const cadastroData = this.cadastroForm.value;
      let existingCadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');
      if (!Array.isArray(existingCadastros)) {
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
