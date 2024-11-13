import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from "../../service/carrinho.service";

@Component({
  selector: 'app-tenis-modal',
  templateUrl: './tenis-modal.component.html',
  styleUrls: ['./tenis-modal.component.scss'],
})
export class TenisModalComponent implements OnInit {
  @Input() item: any;
  quantity: number = 1;
  tamanhos: number[] = [36, 37, 38, 39, 40, 41, 42];
  tamanhoSelecionado: number | null = null;

  isAddButtonDisabled: boolean = true;

  constructor(
    private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.atualizarBotaoAdicionar();
  }

  selecionarTamanho(tamanho: number) {
    this.tamanhoSelecionado = tamanho;
    this.atualizarBotaoAdicionar();
  }

  atualizarBotaoAdicionar() {
    this.isAddButtonDisabled = this.quantity <= 0 || this.tamanhoSelecionado === null;
  }

  async adicionarAoCarrinho() {
    if (!this.isAddButtonDisabled) {
      const itemToAdd = {
        ...this.item,
        quantity: this.quantity,
        tamanho: this.tamanhoSelecionado
      };

      try {
        await this.carrinhoService.addToCart(itemToAdd).toPromise();
        this.presentToast('Item adicionado ao carrinho com sucesso!');
        this.modalController.dismiss();
      } catch (error) {
        await this.presentToast('Houve um erro ao adicionar o item ao carrinho. Tente novamente.');
      }
    } else {
      await this.presentToast('Por favor, selecione um tamanho e a quantidade.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: message.includes('adicionado') ? 'success' : 'danger'
    });
    toast.present();
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
