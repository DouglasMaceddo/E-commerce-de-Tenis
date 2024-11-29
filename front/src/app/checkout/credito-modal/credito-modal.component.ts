import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';

@Component({
  selector: 'app-credito-modal',
  templateUrl: './credito-modal.component.html',
  styleUrls: ['./credito-modal.component.scss'],
})
export class CreditoModalComponent implements OnInit {

  savedCards: any[] = []; // Lista para armazenar os cartões salvos
  isLoading = false;

  constructor(private alertController: AlertController,
              private modalController: ModalController,
              private cartaoCreditoService: CartaoCreditoService) { }

  ngOnInit() {
    this.loadSavedCards();
  }

  // Carregar os cartões salvos
  loadSavedCards() {
    this.isLoading = true;
    this.cartaoCreditoService.getSavedCards().subscribe(
      (cards) => {
        this.savedCards = cards.data;  // A resposta contém a chave 'data' conforme o seu backend
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar cartões:', error);
        this.isLoading = false;
      }
    );
  }

  // Formatar a data de validade do cartão para o formato MM/AA
  formatExpiryDate(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2); // Adiciona "/" após dois dígitos
    }
    input.value = value.slice(0, 5); // Limita ao formato "MM/AA"
  }

  // Submeter o formulário para salvar ou atualizar o cartão
  async onSubmit(form: NgForm) {
    if (!form.valid) {
      const alert = await this.alertController.create({
        header: 'Erro!',
        message: 'Preencha todos os campos corretamente.',
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
    };

    this.isLoading = true;

    this.cartaoCreditoService.salvarCartao(card).subscribe(
      async (response) => {
        const alert = await this.alertController.create({
          header: 'Sucesso!',
          message: 'Cartão salvo com sucesso.',
          buttons: ['OK'],
        });
        await alert.present();
        this.loadSavedCards(); // Atualiza a lista de cartões
        form.reset(); // Limpa o formulário após salvar
        this.isLoading = false;
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: 'Não foi possível salvar o cartão.',
          buttons: ['OK'],
        });
        await alert.present();
        this.isLoading = false;
      }
    );
  }
  async deleteCard(cardId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja realmente excluir este cartão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.cartaoCreditoService.deleteCard(cardId).subscribe(
              () => {
                this.loadSavedCards(); // Atualiza a lista após excluir
              },
              (error) => {
                console.error('Erro ao excluir cartão:', error);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }


  // Fechar o modal
  fecharmodal() {
    this.modalController.dismiss();
  }
}
