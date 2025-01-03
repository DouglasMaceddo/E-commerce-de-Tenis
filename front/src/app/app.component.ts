import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Minha Conta', url: '/minhaconta', icon: 'person' },
    { title: 'Catálogo', url: '/catalogo', icon: 'albums' },
    { title: 'Carrinho', url: '/carrinho', icon: 'cart' },
    { title: 'Meus Pedidos', url: '/pedidos', icon: 'layers' }

  ];

  constructor(private router: Router, private menu: MenuController) {}

  navigateToNovaPagina() {
    this.menu.close();
    this.router.navigate(['/login']);

  }
}
