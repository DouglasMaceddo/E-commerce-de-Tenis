import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';
import { TenisModalComponent } from './tenis-modal/tenis-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    
  ],
  declarations: [CatalogoPage, TenisModalComponent

  ],
  exports: [TenisModalComponent]
  
})
export class CatalogoPageModule {}
