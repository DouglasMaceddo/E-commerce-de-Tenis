import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../Service/carrinho.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';
  isLoading: boolean = false; // Indicador de carregamento

  constructor(private toastController: ToastController, private router: Router, private carrinhoService: CarrinhoService) { }

  ngOnInit() { }

  async login() {
    // Verifica se os campos estão preenchidos
    if (!this.email || !this.senha) {
      await this.presentToast('Por favor, preencha todos os campos.', 'danger');
      return;
    }

    try {
      // Requisição para o endpoint de login
      const response = await fetch(`${environment.api_url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.senha,
        }),
      });

      // Verificando a resposta da requisição
      const message = response.ok
        ? 'Login bem-sucedido!'
        : `Erro no login: ${await response.json().then((err) => err.message || 'Verifique os dados e tente novamente')}`;

      await this.presentToast(message, response.ok ? 'success' : 'danger');

      if (response.ok) {
        // Caso o login seja bem-sucedido, armazena o token e navega para outra página
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        this.router.navigate(['/catalogo']);  // Ou qualquer página de redirecionamento
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      await this.presentToast('Erro inesperado! Tente novamente.', 'danger');
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
    this.router.navigate(['/cadastro']);
  }

}
