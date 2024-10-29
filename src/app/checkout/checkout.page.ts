import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../Service/carrinho.service';
import { CartItem } from '../Service/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  enderecoUsuario: any;
  cart: CartItem[] = []; // Adicione esta linha
  totalCarrinho: number = 0; // Adicione esta linha
  taxaEntrega: number = 0; // Adicione esta linha
  tipoEntrega: string = 'entregaPadrao';
  mostrarTaxa: boolean = false;

  constructor(private router: Router, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carregarEndereco();
    this.carregarCarrinho();
  }

  carregarEndereco() {
    const usuarioLogado = localStorage.getItem('userId');
    const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');
    this.enderecoUsuario = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);
  }
  carregarCarrinho() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart;
      this.totalCarrinho = this.getTotal(); // Calcule o total
    });
  }

  getTotal() {
    const totalProdutos = this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
    return totalProdutos + this.taxaEntrega;
  }
  onTipoEntregaChange(event: any) {
    this.tipoEntrega = event.detail.value; // Atualiza o tipo de entrega
    this.taxaEntrega = this.tipoEntrega === 'entregaRapida' ? 15 : 0; // Define a taxa de entrega
    this.totalCarrinho = this.getTotal(); // Recalcula o total
  }
  toggleTaxaEntrega() {
    this.mostrarTaxa = !this.mostrarTaxa; // Alterna a exibição da taxa de entrega
  }

  cadastrarend() {
    this.router.navigate(['/minhaconta']);
  }

  voltar() {
    this.router.navigate(['/carrinho']);
  }

}
