import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidaOrderPageRoutingModule } from './comida-order-routing.module';

import { ComidaOrderPage } from './comida-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComidaOrderPageRoutingModule
  ],
  declarations: [ComidaOrderPage]
})
export class ComidaOrderPageModule {}
