import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../service/cart-item.model';
import { ModalController } from '@ionic/angular';
import { CreditoModalComponent } from './credito-modal/credito-modal.component';
import { CarrinhoService } from "../service/carrinho.service";
import { EnderecoService } from '../service/endereco.service';
import { ToastController } from '@ionic/angular';
import { PixService } from '../service/pix.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  enderecos: any[] = [];
  cart: CartItem[] = [];
  totalCarrinho: number = 0;
  taxaEntrega: number = 0;
  tipoEntrega: string = 'entregaPadrao';
  mostrarTaxa: boolean = false;
  metodoPagamento: string = '';
  qrCodeUrl: string = '';

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private modalController: ModalController,
    private enderecoService: EnderecoService,
    private toastController: ToastController,
    private pixService: PixService
  ) {}

  ngOnInit() {
    this.carregarCarrinho();
    this.carregarEnderecos();
  }

  carregarCarrinho() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart || [];  // Garantir que 'cart' seja um array
      this.totalCarrinho = this.getTotal();
    });
  }

  getTotal() {
    if (!Array.isArray(this.cart)) {
      this.cart = []; // Garantir que é um array, caso contrário, inicialize como um array vazio
    }
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0) + this.taxaEntrega;
  }


  onTipoEntregaChange(event: any) {
    this.tipoEntrega = event.detail.value;
    this.taxaEntrega = this.tipoEntrega === 'entregaRapida' ? 15 : 0;
    this.totalCarrinho = this.getTotal(); // Recalcular o total com a taxa de entrega
  }

  toggleTaxaEntrega() {
    this.mostrarTaxa = !this.mostrarTaxa;
  }

  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (response) => {
        if (response.success) {
          this.enderecos = response.data;
        }
      },
    });
  }

  cadastrarend() {
    this.router.navigate(['/minhaconta']);
  }

  voltar() {
    this.router.navigate(['/carrinho']);
  }

  async chamarmodalcredito() {
    const modal = await this.modalController.create({
      component: CreditoModalComponent,
      cssClass: 'modalcredito'
    });
    return await modal.present();
  }

  finalizarCompra() {

    if (this.metodoPagamento === 'PIX') {
      this.gerarQRCodePIX();  // Gera o QR Code se o método for PIX
    } else if (this.metodoPagamento === 'Cartão de Crédito') {
      this.presentToast('Por favor, selecione um método de pagamento', 'danger');
    }
    this.router.navigate(['/concluir-pedido']);
  }

  gerarQRCodePIX() {
    const chavePix = 'dougasdv@gmail.com';  // Substitua com a chave Pix do cliente
    const identificador = 'Plazzatenis'; // Um identificador para a transação, como um número de pedido

    // Chama o serviço para gerar o QR Code
    this.pixService.gerarQRCodePix(chavePix, this.totalCarrinho, identificador).then((qrCodeUrl) => {
      this.qrCodeUrl = qrCodeUrl;  // Armazena o QR Code gerado
      console.log('QR Code gerado:', qrCodeUrl);
      
      // Navega para a página 'ConcluirPedido' e passa o QR Code como parâmetro
      this.router.navigate(['/concluir-pedido'], { queryParams: { qrCodeUrl: qrCodeUrl } });
    }).catch((error) => {
      this.presentToast('Erro ao gerar o QR Code', 'danger');
      console.error('Erro ao gerar o QR Code:', error);
    });
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
}
