import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../service/cart-item.model';
import { ModalController } from '@ionic/angular';
import { CreditoModalComponent } from './credito-modal/credito-modal.component';
import { CarrinhoService } from "../service/carrinho.service";
import { EnderecoService } from '../service/endereco.service';
import { ToastController } from '@ionic/angular';
import { PixService } from '../service/pix.service';
import { OrdersService } from '../service/orders.service';
import * as moment from 'moment-timezone';
import { empty } from 'rxjs';

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
  dataEntregaEstimada: string='';

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private modalController: ModalController,
    private enderecoService: EnderecoService,
    private toastController: ToastController,
    private pixService: PixService,
    private ordersService: OrdersService
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
    this.calcularDataEntrega();
  }

  calcularDataEntrega() {
    const dataCompra = moment.tz('America/Sao_Paulo'); // Considerando o horário de Brasília
    let dataEntrega: moment.Moment;
  
    if (this.tipoEntrega === 'entregaRapida') {
      dataEntrega = this.adicionarDiasUteis(dataCompra, 10);
    } else {
      dataEntrega = this.adicionarDiasUteis(dataCompra, 15);
    }
  
    // Definir a data de entrega estimada no formato ISO
    this.dataEntregaEstimada = dataEntrega.toISOString();
  }
  
  adicionarDiasUteis(data: moment.Moment, dias: number): moment.Moment {
    let diasAdicionados = 0;
  
    while (diasAdicionados < dias) {
      // Avança um dia
      data.add(1, 'days');
  
      // Verifica se o dia é útil (segunda a sexta-feira)
      if (data.day() !== 0 && data.day() !== 6) { // 0 = Domingo, 6 = Sábado
        diasAdicionados++;
      }
    }
  
    return data; // Retorna a data com os dias úteis adicionados
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
      if (this.cart.length === 0) {
        this.presentToast('Seu carrinho está vazio', 'danger');
        return;
      }

      if (!this.metodoPagamento) {
        this.presentToast('Selecione um método de pagamento', 'danger');
        return;
      }

      if (!this.enderecos == null) {
        this.presentToast('cadastre um endereco', 'danger');
        return;
      }
    
      const pedidos = this.cart.map(item => ({
        name: item.name,
        marca: item.marca,
        quantity: item.quantity,
        tamanho: item.tamanho,
        valor: item.valor,
        total: item.valor * item.quantity + this.taxaEntrega,
        description: item.description,
        imageUrl: item.imageUrl,
        metodoPagamento: this.metodoPagamento,
        dataPedido: new Date().toISOString(),
        dataEntregaEstimada: this.dataEntregaEstimada,
      }));
      
      pedidos.forEach(pedido => {
        this.ordersService.criarPedido(pedido).subscribe({
          next: (response) => {
            this.presentToast('Pedido criado com sucesso!', 'success');
            this.carrinhoService.clearCart();
            this.router.navigate(['/pedidos']);
          },
          error: (error) => {
            console.error('Erro ao criar o pedido:', error);
            this.presentToast('Erro ao criar o pedido', 'danger');
          },
        });
      });
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
