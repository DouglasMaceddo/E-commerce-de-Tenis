import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoPage } from './catalogo.page';
import { CatalogoPageModule } from './catalogo.module';
import { CadastroPageModule } from '../cadastro/cadastro.module';

const routes: Routes = [
  {
    path: '',
    component: CatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoPageRoutingModule {}
