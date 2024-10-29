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
    { title: 'Catalogo', url: '/catalogo', icon: 'albums' },
    { title: 'Carrinho', url: '/carrinho', icon: 'cart' },
  ];

  constructor(private router: Router, private menu: MenuController) {}

  navigateToNovaPagina() {
    this.menu.close();
    this.router.navigate(['/login']);

  }
}
