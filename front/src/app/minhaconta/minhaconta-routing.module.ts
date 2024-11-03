import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhacontaPage } from './minhaconta.page';

const routes: Routes = [
  {
    path: '',
    component: MinhacontaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhacontaPageRoutingModule {}
