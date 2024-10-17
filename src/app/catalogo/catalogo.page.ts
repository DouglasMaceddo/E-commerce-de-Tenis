import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';
import { CartItem } from '../Service/cart-item.model';
import { CarrinhoService } from '../Service/carrinho.service';
import { TenisService, Tenis } from '../Service/tenis.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  cartItemCount: number = 0;
  searchTerm: string = '';
  tenis: Tenis[] = [];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private tenisService: TenisService
  ) { }

  ngOnInit() {
    this.tenis = this.tenisService.getTenis();
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