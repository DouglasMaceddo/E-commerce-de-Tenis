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
    if (!this.email || !this.senha) {
      await this.presentToast('Por favor, preencha todos os campos.', 'danger');
      return;
    }

    this.isLoading = true; // Inicia o carregamento

    try {
      const response = await fetch(`${environment.api_url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.senha,
        }),
      });

      let message = 'Verifique os dados e tente novamente';
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.token); // Armazena o token temporariamente
        this.router.navigate(['/catalogo']);
        message = 'Login bem-sucedido!';
        await this.presentToast(message, 'success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        message = errorData.message || message;
        await this.presentToast(message, 'danger');
      }

    } catch (error) {
      await this.presentToast('Usuário e senha incorretos, tente novamente.', 'danger');
    } finally {
      this.isLoading = false; // Termina o carregamento
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
    this.router.navigate(['/cadastro']);
  }
}
