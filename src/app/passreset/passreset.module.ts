import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PassresetPageRoutingModule } from './passreset-routing.module';
import { PasswordResetPage } from './passreset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PassresetPageRoutingModule
  ],
  declarations: [PasswordResetPage]
})
export class PassresetPageModule {}
