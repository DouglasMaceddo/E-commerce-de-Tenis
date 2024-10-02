import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private alertController: AlertController,
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
        await this.presentAlert('Cadastro salvo com sucesso!', 'Seu cadastro foi realizado com sucesso.');
        this.router.navigate(['/login']);
    } else {
        console.log('Formulário inválido');
    }
}


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }
}