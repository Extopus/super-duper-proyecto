import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications'; // Importa el plugin

@Component({
  selector: 'app-comida-order',
  templateUrl: './comida-order.page.html',
  styleUrls: ['./comida-order.page.scss'],
})
export class ComidaOrderPage implements OnInit {
  selectedPlatos: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // Solicitar permisos para notificaciones locales
  async requestPermissions() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display !== 'granted') {
      console.log('Permiso para notificaciones denegado');
    } else {
      console.log('Permiso para notificaciones concedido');
    }
  }

  ngOnInit() {
    this.requestPermissions(); // Solicita permisos al iniciar
    this.selectedPlatos = this.orderService.getSelectedDishes();
  }

  async removePlato(plato: any) {
    this.orderService.removeDish(plato);
    this.selectedPlatos = this.selectedPlatos.filter(p => p !== plato);
  }

  async confirmOrder() {
    const orderNumber = Math.floor(Math.random() * 1000);
    console.log(`Order Number: ${orderNumber}`, this.selectedPlatos);

    // Limpia la orden
    this.orderService.clearOrder();

    // Programar notificación
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Orden Confirmada',
          body: '¡Tu orden está lista!',
          schedule: { at: new Date(new Date().getTime() + 5000) }, // En 5 segundos
          sound: 'default',
          smallIcon: 'ic_launcher',
        },
      ],
    });

    // Mensaje Toast
    const toast = await this.toastController.create({
      message: 'Orden realizada, ¡que lo disfrutes!',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();

    this.router.navigate(['/home']);
  }
}
