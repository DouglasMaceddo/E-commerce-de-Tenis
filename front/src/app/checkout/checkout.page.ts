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
  tipoEntrega: string = 'entregaPadrao'; // Tipo de entrega inicial (padrão)
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

  // Carregar o endereço do usuário a partir do localStorage
  carregarEndereco() {
    const usuarioLogado = sessionStorage.getItem('authToken'); // Obter o authToken do sessionStorage
    const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]'); // Pega os endereços salvos no localStorage
    // Encontra o endereço correspondente ao usuário logado
    this.enderecoUsuario = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);
  }

  // Carregar os itens do carrinho
  carregarCarrinho() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart || [];  // Garantir que o carrinho seja um array
      this.totalCarrinho = this.getTotal();  // Calcular o total do carrinho
    });
  }

  // Calcular o total do carrinho (somando o valor de cada item multiplicado pela sua quantidade)
  getTotal() {
    if (!Array.isArray(this.cart)) {
      this.cart = []; // Caso o carrinho não seja um array, inicializa como array vazio
    }
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
  }

  // Alterar o tipo de entrega (rápida ou padrão)
  onTipoEntregaChange(event: any) {
    this.tipoEntrega = event.detail.value;  // Atualiza o tipo de entrega
    this.calcularTaxaEntrega();  // Recalcula a taxa de entrega
    this.totalCarrinho = this.getTotal();  // Recalcula o total do carrinho
  }

  // Calcular a taxa de entrega com base no tipo de entrega
  calcularTaxaEntrega() {
    this.taxaEntrega = this.tipoEntrega === 'entregaRapida' ? 15 : 0;  // Se entrega rápida, taxa de R$ 15
    this.mostrarTaxa = this.taxaEntrega > 0;  // Exibe a taxa se for maior que 0
  }

  // Alternar a visibilidade da taxa de entrega
  toggleTaxaEntrega() {
    this.mostrarTaxa = !this.mostrarTaxa;  // Alterna a visibilidade da taxa
  }

  // Redireciona para a página de cadastro de endereço
  cadastrarend() {
    this.router.navigate(['/minhaconta']);  // Navega para a página de "Minha Conta"
  }

  // Voltar para a página do carrinho
  voltar() {
    this.router.navigate(['/carrinho']);  // Navega de volta para o carrinho
  }

  // Abre o modal de pagamento com cartão de crédito
  async chamarmodalcredito() {
    const modal = await this.modalController.create({
      component: CreditoModalComponent,
      cssClass: 'modalcredito'  // Classe CSS para customizar o modal
    });
    return await modal.present();  // Exibe o modal
  }
}
