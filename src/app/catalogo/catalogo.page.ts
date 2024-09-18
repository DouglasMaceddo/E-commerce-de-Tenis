import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  tenis = [
    { id: 1, name: 'Adidas', valor: '250.00', description: 'Tenis de andar tranquilo', imageUrl: "/assets/Imagens/Adidas1.jpg" },
    { id: 2, name: 'Nike', valor: '260.00', description: 'corrida', imageUrl: '/assets/Imagens/Nike2.jpg' },
    { id: 3, name: 'Nike', valor: '290.00', description: 'saidinha', imageUrl: '/assets/Imagens/Nike3.jpg' },
    { id: 4, name: 'Oakley', valor: '300.00', description: 'sair pra andar', imageUrl: "/assets/Imagens/Oakley1.jpg"},
    { id: 5, name: 'Mizuno', valor: '1,000.00', description: 'sair', imageUrl: "/assets/Imagens/Mizuno.jpg" },
    { id: 6, name: 'Olimpicos', valor: '300.00', description: 'sair pra andar', imageUrl:"/assets/Imagens/Olimpicos.jpg" },
    { id: 7, name: 'Air Max', valor: '300.00', description: 'sair pra andar', imageUrl:  "/assets/Imagens/Nike.jpg"}
  ];
  
  constructor(private router: Router, private modalController: ModalController) { }

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
    return await modal.present();
  }

  ngOnInit() {}
}

