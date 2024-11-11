import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';
import { CartItem } from '../Service/cart-item.model';
import { CarrinhoService } from '../Service/carrinho.service';
import {Tenis, TenisService} from "../service/tenis.service";

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  cartItemCount: number = 0;
  searchTerm: string = '';
  tenis: Tenis[] = []; // Array para armazenar os tênis

  constructor(
    private router: Router,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private tenisService: TenisService
  ) { }

  ngOnInit() {
    this.tenisService.getTenis().subscribe(
      (data) => {
        this.tenis = data; // Atribui os dados dos tênis à variável
      },
      (error) => {
        console.error('Erro ao carregar os tênis:', error);
      }
    );
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
      (tenis.marca && tenis.marca.toLowerCase().includes(this.searchTerm.toLowerCase())) // Correção no 'Marca'
    );
  }

  updateCartItemCount() {
    this.cartItemCount = this.carrinhoService.getCartItemCount(); // Atualiza a contagem do carrinho
  }
}
