import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ItemService } from '../item.service';
import { ToastController } from '@ionic/angular';
import { Item } from '../item.model';
import { LocalNotifications } from '@capacitor/local-notifications';
import * as moment from 'moment'; // Importa moment.js

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  dishes: Item[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  placeholderDish: Item = {
    id: 777,
    name: 'Plato vacío',
    description: 'Un plato vacío',
    price: 1,
    image: 'null',
  };
  currentTime: string = ''; // Para almacenar la hora actual

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.requestPermissions(); // Solicitar permisos al cargar
    this.loadItems(); // Cargar platos disponibles
    this.username = this.getUsername(); // Configurar el nombre de usuario
    this.updateTime(); // Actualiza la hora en el inicio
  }

  // Función para obtener la hora actual y mostrarla
  updateTime() {
    setInterval(() => {
      this.currentTime = moment().format('HH:mm:ss'); // Formato de hora:minuto:segundo
      this.checkCasinoStatus(); // Verificar el estado del casino basado en la hora
    }, 1000); // Actualizar cada segundo
  }

  // Función para solicitar permisos de notificación
  async requestPermissions() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display !== 'granted') {
      console.error('Permiso para notificaciones denegado');
    }
  }

  // Verifica el estado del casino basado en la hora
  async checkCasinoStatus() {
    const hour = moment().hour(); // Obtener la hora actual

    let message = '';

    if (hour >= 9 && hour < 12) {
      message = 'El casino está operando';
    } else if (hour >= 12 && hour < 14) {
      message = 'Aún no es hora de ir a comer';
    } else {
      message = 'El casino está cerrado';
    }

    await this.showToast(message); // Muestra el toast con el mensaje correspondiente
  }

  // Función para mostrar el toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del toast
      position: 'bottom', // Posición del toast
    });
    toast.present();
  }

  // Función para obtener el nombre de usuario
  private getUsername(): string {
    return localStorage.getItem('username') || 'Usuario';
  }

  // Función para cargar los platos disponibles
  private loadItems() {
    this.isLoading = true;
    this.itemService.getItems().subscribe(
      (data) => {
        this.dishes = data;
        this.isLoading = false;
        if (this.dishes.length === 0) {
          this.errorMessage = 'No hay platos disponibles en este momento.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al obtener los platos. Inténtalo más tarde.';
        console.error(error);
      }
    );
  }

  // Función para añadir un plato a la orden
  async addDish(dish: Item) {
    this.orderService.addDish(dish);
    const toast = await this.toastController.create({
      message: 'Plato añadido a tu orden',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
