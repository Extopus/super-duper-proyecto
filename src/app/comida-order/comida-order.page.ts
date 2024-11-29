import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-comida-order',
  templateUrl: './comida-order.page.html',
  styleUrls: ['./comida-order.page.scss'],
})
export class ComidaOrderPage implements OnInit {
  selectedPlatos: any[] = []; 

  constructor(private orderService: OrderService, private router: Router, private toastController: ToastController) { } 

  ngOnInit() {
    this.selectedPlatos = this.orderService.getSelectedDishes(); 
  }

  async removePlato(plato: any) {
    this.orderService.removeDish(plato);
    this.selectedPlatos = this.selectedPlatos.filter(p => p !== plato);
  }

  async confirmOrder() {
    const orderNumber = Math.floor(Math.random() * 1000); 
    console.log(`Order Number: ${orderNumber}`, this.selectedPlatos);
    this.orderService.clearOrder(); 

    const toast = await this.toastController.create({
      message: 'Orden realizada, ¡que lo disfrutes!',
      duration: 2000, 
      position: 'bottom' 
    });
    toast.present();

    this.router.navigate(['/home']); 
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}


