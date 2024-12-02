import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagamentoPixPage } from './pagamento-pix.page';

const routes: Routes = [
  {
    path: '',
    component: PagamentoPixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagamentoPixPageRoutingModule {}
