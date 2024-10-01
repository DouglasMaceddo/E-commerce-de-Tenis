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

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  // Método para realizar o login
  login() {
    // Buscar os dados de cadastro do localStorage
    const dadosCadastro = JSON.parse(localStorage.getItem('cadastro') || '{}');

    // Verificar se o localStorage tem os dados e se correspondem ao login informado
    if (dadosCadastro && dadosCadastro.login === this.email && dadosCadastro.senha === this.senha) {
      console.log('Login bem-sucedido!');
      this.router.navigate(['/catalogo']); // Navegar para a página inicial ou home após o login bem-sucedido
    } else {
      this.presentAlert('Erro', 'Email ou senha inválidos!');
    }
  }

  // Método para navegação à página de cadastro
  navigateToNovaPagina() {
    this.router.navigate(['/cadastro']);
  }

  // Apresenta alerta no caso de erro de login
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

