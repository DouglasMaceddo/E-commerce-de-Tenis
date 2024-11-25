import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {CarrinhoService} from "../../service/carrinho.service";
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';


@Component({
  selector: 'app-credito-modal',
  templateUrl: './credito-modal.component.html',
  styleUrls: ['./credito-modal.component.scss'],
})
export class CreditoModalComponent implements OnInit {

  savedCard: any = null;
  savedCards: any[] = []; // Lista para armazenar os cartões salvos
  isLoading = false;

  constructor(private alertController: AlertController,
    private modalController: ModalController,
    private cartaoCreditoService: CartaoCreditoService) { }

  ngOnInit() {
    this.loadSavedCards();
   }

   loadSavedCards() {
    const userId = localStorage.getItem('userId'); // Obtenha o ID do usuário logado
    if (userId) {
      this.cartaoCreditoService.getSavedCards(Number(userId)).subscribe(
        (data) => {
          this.savedCards = data; // Armazene os cartões recuperados
        },
        (error) => {
          console.error('Erro ao carregar cartões:', error);
        }
      );
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
    const userId = sessionStorage.getItem('authToken');
    
    if (!userId) {
      const alert = await this.alertController.create({
        header: 'Erro!',
        message: 'Usuário não logado. Não foi possível salvar os dados do cartão.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const card = {
      cardName: form.value.cardName,
      cardNumber: form.value.cardNumber,
      expiryDate: form.value.expiryDate,
      cvv: form.value.cvv,
      userId: Number(userId), // Associa o cartão ao ID do usuário
    };

    this.isLoading = true;

    this.cartaoCreditoService.saveCard(card).subscribe(
      async (response) => {
        const alert = await this.alertController.create({
          header: 'Sucesso!',
          message: 'Dados do cartão salvos com sucesso.',
          buttons: ['OK'],
        });
        await alert.present();
        this.loadSavedCards(); // Atualiza a lista de cartões após o sucesso
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: 'Não foi possível salvar os dados do cartão.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  fecharmodal() {
    this.modalController.dismiss();
  }
}
