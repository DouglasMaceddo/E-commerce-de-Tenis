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
    { id: 1, name: 'Adidas', valor: '250.00', description: 'Tenis de andar tranquilo', imageUrl: 'https://cdn.dooca.store/296/products/30-off-3_1080x1080+fill_ffffff.jpg?v=1657912268&webp=0' },
    { id: 2, name: 'Nike', valor: '260.00', description: 'corrida', imageUrl: 'https://imgcentauro-a.akamaihd.net/768x768/98582041.jpg' },
    { id: 3, name: 'Nike', valor: '290.00', description: 'saidinha', imageUrl: 'https://cdn.dooca.store/100/products/tenis-nike-air-max-excee-ewt-light-soft-pink.jpg?v=1697826631' },
    { id: 4, name: 'Oakley', valor: '300.00', description: 'sair pra andar', imageUrl: 'https://static.netshoes.com.br/produtos/tenis-oakley-stratus-unissex/04/PFN-1494-004/PFN-1494-004_zoom1.jpg?ts=1719227469?ims=1088x' },
    { id: 5, name: 'Mizuno', valor: '1,000.00', description: 'sair', imageUrl: 'https://static.netshoes.com.br/produtos/tenis-mizuno-wave-prophecy-13-masculino/72/2FU-9229-172/2FU-9229-172_zoom1.jpg?ts=1706029255?ims=1088x' },
    { id: 6, name: 'Olimpicos', valor: '300.00', description: 'sair pra andar', imageUrl: 'https://m.media-amazon.com/images/I/612e031jM6L.__AC_SX300_SY300_QL70_ML2_.jpg' },
    { id: 7, name: 'Air Max', valor: '300.00', description: 'sair pra andar', imageUrl: 'https://www.esportepresidente.com.br/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/t/e/tenis_nike_air_max_excee_masculino_branco_e_azul.jpg' }
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

