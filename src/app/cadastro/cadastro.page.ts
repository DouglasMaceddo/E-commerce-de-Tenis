import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastController: ToastController,
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
