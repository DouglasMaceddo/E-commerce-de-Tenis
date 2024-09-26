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


  tenis = [
    { id: 1, name: 'Adidas', valor: 250.99, description: 'Tenis de andar tranquilo', imageUrl: "/assets/Imagens/Adidas1.jpg" },
    { id: 2, name: 'Nike', valor: 260.89, description: 'corrida', imageUrl: '/assets/Imagens/Nike2.jpg' },
    { id: 3, name: 'Nike', valor: 290.99, description: 'saidinha', imageUrl: '/assets/Imagens/Nike3.jpg' },
    { id: 4, name: 'Oakley', valor: 329.89, description: 'sair pra andar', imageUrl: "/assets/Imagens/Oakley1.jpg"},
    { id: 5, name: 'Mizuno', valor: 1000.00, description: 'sair', imageUrl: "/assets/Imagens/Mizuno.jpg" },
    { id: 6, name: 'Olimpicos', valor: 349.99, description: 'sair pra andar', imageUrl:"/assets/Imagens/Olimpicos.jpg" },
    { id: 7, name: 'Air Max', valor: 329.99, description: 'sair pra andar', imageUrl:  "/assets/Imagens/Nike.jpg"}
  ];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService
  ) {
    
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

  ngOnInit() {}
}
