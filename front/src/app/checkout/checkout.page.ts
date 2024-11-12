import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../service/cart-item.model';
import { ModalController } from '@ionic/angular';
import { CreditoModalComponent } from './credito-modal/credito-modal.component';
import { CarrinhoService } from "../service/carrinho.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  enderecoUsuario: any;
  cart: CartItem[] = [];
  totalCarrinho: number = 0;
  taxaEntrega: number = 0;
  tipoEntrega: string = 'entregaPadrao';
  mostrarTaxa: boolean = false;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.carregarEndereco();
    this.carregarCarrinho();
  }

  carregarEndereco() {
    const usuarioLogado = sessionStorage.getItem('authToken'); // Alterado para pegar do sessionStorage
    const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');
    this.enderecoUsuario = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);
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
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
  }


  onTipoEntregaChange(event: any) {
    this.tipoEntrega = event.detail.value;
    this.taxaEntrega = this.tipoEntrega === 'entregaRapida' ? 15 : 0;
    this.totalCarrinho = this.getTotal();
  }

  toggleTaxaEntrega() {
    this.mostrarTaxa = !this.mostrarTaxa;
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
}

