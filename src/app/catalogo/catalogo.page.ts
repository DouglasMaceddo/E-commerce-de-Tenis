import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';
import { CartItem } from '../carrinho/cart-item.model';
import { CarrinhoService } from '../carrinho/carrinho.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  cartItemCount: number = 0;
  searchTerm: string = '';

  tenis = [
    { id: 1, name: 'Tênis Adidas', Marca: 'Adidas', valor: 250.99, description: 'Tenis de andar', imageUrl: "/assets/Imagens/Adidas1.jpg" },
    { id: 2, name: 'Tênis Adidas', Marca: 'Adidas', valor: 309.99, description: 'Tenis de andar', imageUrl: "/assets/Imagens/Adidas2.jpg" },
    { id: 3, name: 'Tênis Nike', Marca: 'Nike', valor: 260.89, description: 'Tenis de corrida', imageUrl: '/assets/Imagens/Nike2.jpg' },
    { id: 4, name: 'Tênis Nike', Marca: 'Nike', valor: 549.89, description: 'Tenis de corrida', imageUrl: '/assets/Imagens/Nike1.jpg' },
    { id: 5, name: 'Tênis Nike', Marca: 'Nike', valor: 290.99, description: 'saidinha', imageUrl: '/assets/Imagens/Nike3.jpg' },
    { id: 6, name: 'Tênis Oakley', Marca: 'Oakley', valor: 329.89, description: 'sair pra andar', imageUrl: "/assets/Imagens/Oakley1.jpg" },
    { id: 7, name: 'Tênis Oakley', Marca: 'Oakley', valor: 529.89, description: 'sair pra andar', imageUrl: "/assets/Imagens/Oakley2.jpg" },
    { id: 8, name: 'Tênis Mizuno', Marca: 'Mizuno', valor: 1000.00, description: 'sair', imageUrl: "/assets/Imagens/Mizuno.jpg" },
    { id: 9, name: 'Tênis Olympikus', Marca: 'Olympikus', valor: 349.99, description: 'sair pra andar', imageUrl: "/assets/Imagens/Olympikus1.jpg" },
    { id: 10, name: 'Tênis Olympikus', Marca: 'Olympikus', valor: 249.99, description: 'Conforto e Elegancia', imageUrl: "/assets/Imagens/Olympikus.jpg" },
    { id: 11, name: 'Tênis Air Max', Marca: 'Nike', valor: 329.99, description: 'sair pra andar', imageUrl: "/assets/Imagens/Nike.jpg" },
    { id: 12, name: 'Tênis Fyer Runner', Marca: 'Puma', valor: 199.99, description: 'sair pra Experimente o conforto e desempenho do Tênis Puma Flyer Runner Mesh BDP Feminino. Ideal para corrida e atividades do dia a dia. Com design leve e respirável, proporciona estilo e conforto duradouro. Combine-o com regata e bermuda de treino para um visual completto e super atualizado. Eleve sua experiência de running active com estilo e qualidade. Aposte!',imageUrl: "/assets/Imagens/Puma.jpg"}
  ];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.updateCartItemCount();

    this.carrinhoService.cart$.subscribe(() => {
      this.updateCartItemCount();
    });
  }

  navigateToNovaPagina() {
    this.router.navigate(['/login']);
  }

  navegarPaginaCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  async chamarModal(item: any) {
    const modal = await this.modalController.create({
      component: TenisModalComponent,
      componentProps: { item }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const itemToAdd: CartItem = {
          ...item,
          quantity: result.data.quantity // Pegue a quantidade do resultado do modal
        };
        this.carrinhoService.addToCart(itemToAdd);
      }
    });

    return await modal.present();
  }

  get filteredTenis() {
    if (!this.searchTerm) {
      return this.tenis; // Retorna todos os tênis se não houver pesquisa
    }
    return this.tenis.filter(tenis =>
      tenis.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (tenis.Marca && tenis.Marca.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  updateCartItemCount() {
    this.cartItemCount = this.carrinhoService.getCartItemCount(); // Atualiza a contagem
  }
}