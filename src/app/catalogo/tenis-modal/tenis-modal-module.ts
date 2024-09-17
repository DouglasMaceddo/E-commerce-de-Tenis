import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CatalogoPage } from '../catalogo.page';
import { TenisModalComponent } from './tenis-modal.component';
import { CatalogoPageModule } from '../catalogo.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    CatalogoPageModule
  ]
})
export class TenisModalModule { }