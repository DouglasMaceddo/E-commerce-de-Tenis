import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }
  login() {
    const cadastroData = JSON.parse(localStorage.getItem('cadastros') || '[]');

    if (Array.isArray(cadastroData)) {
        const usuario = cadastroData.find(user => user.login === this.email && user.senha === this.senha);

        if (usuario) {
            console.log('Login bem-sucedido!');
            // Salva o login do usuário logado
            localStorage.setItem('usuarioLogado', usuario.login); 
            this.router.navigate(['/catalogo']);
        } else {
            this.presentAlert('Erro', 'Email ou senha inválidos!');
        }
    } else {
        this.presentAlert('Erro', 'Nenhum cadastro encontrado.');
    }
}

  navigateToNovaPagina() {
    this.router.navigate(['/cadastro']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

