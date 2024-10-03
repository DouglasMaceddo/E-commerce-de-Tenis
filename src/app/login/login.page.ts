import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(private toastController: ToastController, private router: Router) {}
  ngOnInit(){}

  login() {
    const cadastroData = JSON.parse(localStorage.getItem('cadastros') || '[]');

    if (Array.isArray(cadastroData)) {
        const usuario = cadastroData.find(user => user.login === this.email && user.senha === this.senha);

        if (usuario) {
            console.log('Login bem-sucedido!');
            // Salva o login do usuário logado
            localStorage.setItem('usuarioLogado', usuario.login);
            this.router.navigate(['/catalogo']);
            this.presentToast('Login bem-sucedido!', 'success'); // Toast verde para sucesso
        } else {
            this.presentToast('Email ou senha inválidos!', 'danger'); // Toast vermelho para erro
        }
    } else {
        this.presentToast('Nenhum cadastro encontrado.', 'danger'); // Toast vermelho para erro
    }
}

  navigateToNovaPagina() {
    this.router.navigate(['/cadastro']);
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
}

