import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComidaOrderPage } from './comida-order.page';

const routes: Routes = [
  {
    path: '',
    component: ComidaOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComidaOrderPageRoutingModule {}
