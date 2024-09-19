import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CarrinhoService } from 'src/app/carrinho/carrinho.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tenis-modal',
  templateUrl: './tenis-modal.component.html',
  styleUrls: ['./tenis-modal.component.scss'],
})
export class TenisModalComponent {
  @Input() item: any;
  quantity: number = 1; // Valor padrão da quantidade
  tamanhos: number[] = [36, 37, 38, 39, 40, 41, 42]; // Lista de tamanhos disponíveis
  tamanhoSelecionado: number | null = null; // Tamanho selecionado

  constructor(
    private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  selecionarTamanho(tamanho: number) {
    this.tamanhoSelecionado = tamanho;
  }

  async adicionarAoCarrinho() {
    if (this.quantity > 0 && this.tamanhoSelecionado !== null) {
      this.carrinhoService.addToCart({
        ...this.item,
        quantity: this.quantity,
        tamanho: this.tamanhoSelecionado
      });

      await this.presentToast('Item adicionado ao carrinho com sucesso!');
      this.modalController.dismiss();
    } else {
      await this.presentToast('Por favor, selecione um tamanho e a quantidade.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: message.includes('adicionado') ? 'success' : 'danger' // Cor do toast com base na mensagem
    });
    toast.present();
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
