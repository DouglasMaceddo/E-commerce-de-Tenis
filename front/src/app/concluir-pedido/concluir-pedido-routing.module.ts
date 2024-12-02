import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcluirPedidoPage } from './concluir-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ConcluirPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcluirPedidoPageRoutingModule {}
