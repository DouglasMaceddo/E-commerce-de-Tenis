import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },
  {
    path: 'minhaconta',
    loadChildren: () => import('./minhaconta/minhaconta.module').then( m => m.MinhacontaPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },  {
    path: 'pedidos',
    loadChildren: () => import('./pedido/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'concluir-pedido',
    loadChildren: () => import('./concluir-pedido/concluir-pedido.module').then( m => m.ConcluirPedidoPageModule)
  },
  {
    path: 'pagamento-pix',
    loadChildren: () => import('./pagamento-pix/pagamento-pix.module').then( m => m.PagamentoPixPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
