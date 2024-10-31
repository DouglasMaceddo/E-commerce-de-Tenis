import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { CarrinhoService } from 'src/app/Service/carrinho.service';

@Component({
  selector: 'app-credito-modal',
  templateUrl: './credito-modal.component.html',
  styleUrls: ['./credito-modal.component.scss'],
})
export class CreditoModalComponent implements OnInit {

  savedCard: any = null;
  savedCards: any[] = []; // Lista para armazenar os cartões salvos

  constructor(private alertController: AlertController,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.loadSavedCards(); 
   }

  loadSavedCards() {
    const userId = localStorage.getItem('userId'); // Obtenha o ID do usuário logado
    if (userId) {
      const savedCards = JSON.parse(localStorage.getItem(`CartãoDeCredito_${userId}`) || '[]'); // Obtenha os cartões salvos
      this.savedCards = savedCards; // Armazene os cartões na propriedade
    }
  }

  formatExpiryDate(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos

    // Adiciona "/" após os primeiros dois dígitos para formar "MM/AAAA"
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    // Limita a entrada ao formato "MM/AAAA" (7 caracteres no total)
    input.value = value.slice(0, 5);
  }
  async onSubmit(form: NgForm) {
    // Obtenha o ID do usuário logado
    const userId = localStorage.getItem('userId'); // Agora usamos o localStorage para obter o ID do usuário

    if (!userId) {
      const alert = await this.alertController.create({
        header: 'Erro!',
        message: 'Usuário não logado. Não foi possível salvar os dados do cartão.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Retorna se o usuário não estiver logado
    }

    this.savedCard = {
      cardName: form.value.cardName,
      cardNumber: form.value.cardNumber,
      expiryDate: form.value.expiryDate,
      cvv: form.value.cvv,
    };

    // Salve os dados do cartão no localStorage
    const savedCards = JSON.parse(localStorage.getItem(`CartãoDeCredito_${userId}`) || '[]'); // Obtenha os cartões salvos
    savedCards.push(this.savedCard); // Adicione o novo cartão
    localStorage.setItem(`CartãoDeCredito_${userId}`, JSON.stringify(savedCards)); // Salve novamente no localStorage

    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Dados do cartão salvos com sucesso.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  fecharmodal() {
    this.modalController.dismiss();
  }
}