import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';
import { CartItem } from '../service/cart-item.model';
import { CarrinhoService } from '../service/carrinho.service';
import { Tenis, TenisService } from "../service/tenis.service";

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
    this.tenisService.getTenis().subscribe(
      (data) => {
        this.tenis = data;
      },
      (error) => {
        console.error('Erro ao carregar os tênis:', error);
      }
    );

    // Atualizar contador do carrinho ao mudar
    this.carrinhoService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    });
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
          quantity: result.data.quantity,
          tamanho: result.data.tamanho
        };
        this.carrinhoService.addToCart(itemToAdd);
      }
    });

    return await modal.present();
  }

  get filteredTenis() {
    if (!this.searchTerm) {
      return this.tenis;
    }
    return this.tenis.filter(tenis =>
      tenis.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (tenis.marca && tenis.marca.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  navegarPaginaCarrinho() {
    this.router.navigate(['/carrinho']).catch((error) => {
    });
  }
}
