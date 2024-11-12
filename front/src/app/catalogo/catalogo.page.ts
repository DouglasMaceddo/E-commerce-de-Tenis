import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';
import { CartItem } from '../service/cart-item.model';
import { CarrinhoService } from '../service/carrinho.service';
import {Tenis, TenisService} from "../service/tenis.service";

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
  }

  navegarPaginaCarrinho() {
    console.log('Tentando navegar para a página de carrinho...');
    this.router.navigate(['/carrinho']).catch((error) => {
      console.error('Erro ao navegar para o carrinho:', error);
    });
  }

  async chamarModal(item: any) {
    console.log('Abrindo modal para o item:', item);
    const modal = await this.modalController.create({
      component: TenisModalComponent,
      componentProps: { item }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const itemToAdd: CartItem = {
          ...item,
          quantity: result.data.quantity
        };
        console.log('Adicionando ao carrinho:', itemToAdd);
        this.carrinhoService.addToCart(itemToAdd).subscribe(() => {
          this.updateCartItemCount();
          console.log('Carrinho atualizado');
        }, (error) => {
          console.error('Erro ao adicionar item ao carrinho:', error);
        });
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

  updateCartItemCount() {
    this.cartItemCount = this.carrinhoService.getCartItemCount();
  }
}
