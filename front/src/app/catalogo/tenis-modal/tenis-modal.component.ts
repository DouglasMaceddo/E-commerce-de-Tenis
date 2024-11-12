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
  quantity: number = 1; // Valor padrão da quantidade
  tamanhos: number[] = [36, 37, 38, 39, 40, 41, 42]; // Lista de tamanhos disponíveis
  tamanhoSelecionado: number | null = null; // Tamanho selecionado

  // Variável para desabilitar o botão de adicionar
  isAddButtonDisabled: boolean = true;

  constructor(
    private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // A cada vez que o item é recebido, atualize a disponibilidade do botão
    this.atualizarBotaoAdicionar();
  }

  selecionarTamanho(tamanho: number) {
    this.tamanhoSelecionado = tamanho;
    this.atualizarBotaoAdicionar(); // Atualiza o botão quando o tamanho é selecionado
  }

  atualizarBotaoAdicionar() {
    // Desabilita o botão se a quantidade for 0 ou o tamanho não for selecionado
    this.isAddButtonDisabled = this.quantity <= 0 || this.tamanhoSelecionado === null;
  }

  async adicionarAoCarrinho() {
    if (!this.isAddButtonDisabled) {
      try {
        await this.carrinhoService.addToCart({
          ...this.item,
          quantity: this.quantity,
          tamanho: this.tamanhoSelecionado
        }).toPromise(); // Espera a resposta da requisição
        this.presentToast('Item adicionado ao carrinho com sucesso!');
        this.modalController.dismiss();
      } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
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
      color: message.includes('adicionado') ? 'success' : 'danger' // Cor do toast com base na mensagem
    });
    toast.present();
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
