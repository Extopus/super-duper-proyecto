import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ItemService } from '../item.service';
import { ToastController } from '@ionic/angular';
import { Item } from '../item.model';
import { LocalNotifications } from '@capacitor/local-notifications';
import * as moment from 'moment'; // Importa moment.js para manejo de fechas

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = ''; // Almacena el nombre de usuario
  dishes: Item[] = []; // Lista completa de platos
  filteredDishes: Item[] = []; // Lista filtrada de platos para búsqueda
  searchQuery: string = ''; // Consulta del buscador
  isLoading: boolean = false; // Indica si los datos están cargándose
  errorMessage: string = ''; // Mensaje de error
  currentTime: string = ''; // Hora actual para mostrar
  placeholderDish: Item = {
    id: 777,
    name: 'Plato vacío',
    description: 'Un plato vacío',
    price: 1,
    image: 'null',
  };

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.requestPermissions(); // Solicitar permisos de notificaciones
    this.loadItems(); // Cargar los platos disponibles
    this.username = this.getUsername(); // Cargar el nombre del usuario
    this.updateTime(); // Iniciar la actualización de la hora
  }

  // Actualiza la hora actual cada segundo
  updateTime() {
    setInterval(() => {
      this.currentTime = moment().format('HH:mm:ss'); // Formato de hora:minuto:segundo
      this.checkCasinoStatus(); // Verifica el estado del casino según la hora
    }, 1000); // Actualización cada segundo
  }

  // Solicita permisos para enviar notificaciones
  async requestPermissions() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display !== 'granted') {
      console.error('Permiso para notificaciones denegado');
    }
  }

  // Verifica si el casino está abierto o cerrado según la hora
  async checkCasinoStatus() {
    const hour = moment().hour(); // Obtiene la hora actual
    let message = '';

    if (hour >= 9 && hour < 12) {
      message = 'El casino está operando';
    } else if (hour >= 12 && hour < 14) {
      message = 'Aún no es hora de ir a comer';
    } else {
      message = 'El casino está cerrado';
    }

    await this.showToast(message); // Muestra un toast con el estado actual
  }

  // Muestra un toast con un mensaje
  async showToast(message?: string) {
    const toast = await this.toastController.create({
      message: message || `Hora actual: ${moment().format('HH:mm:ss')}`,
      duration: 2000, // Duración de 2 segundos
      position: 'bottom', // Posición del toast
    });
    toast.present();
  }

  // Obtiene el nombre del usuario almacenado en el localStorage
  private getUsername(): string {
    return localStorage.getItem('username') || 'Usuario';
  }

  // Carga los platos disponibles desde el servicio
  private loadItems() {
    this.isLoading = true;
    this.itemService.getItems().subscribe(
      (data) => {
        this.dishes = data;
        this.filteredDishes = [...this.dishes]; // Inicializa la lista filtrada
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

  // Filtra los platos según la consulta de búsqueda y devuelve la lista filtrada
  filterDishes(): Item[] {
    if (!this.searchQuery) {
      return (this.filteredDishes = [...this.dishes]); // Sin búsqueda, mostrar todos
    }
    this.filteredDishes = this.dishes.filter((dish) =>
      dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    return this.filteredDishes;
  }

  // Añade un plato a la orden y muestra un toast de confirmación
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
