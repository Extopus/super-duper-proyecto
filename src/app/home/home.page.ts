import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ItemService } from '../item.service'; // Import ItemService
import { ToastController } from '@ionic/angular';
import { Item } from '../item.model'; // Import the Item interface

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit { // Implement OnInit
  username: string = '';
  dishes: Item[] = []; // Change to Item array

  constructor(
    private orderService: OrderService,
    private itemService: ItemService, // Inject ItemService
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadItems(); // Fetch items on initialization
  }

  ionViewWillEnter() {
    this.username = this.getUsername();
  }

  private getUsername(): string {
    return localStorage.getItem('username') || 'Usuario';
  }

  private loadItems() {
    this.itemService.getItems().subscribe((data) => {
      this.dishes = data; // Set fetched items to dishes
    });
  }

  async addDish(dish: Item) { // Change parameter to Item
    this.orderService.addDish(dish);
    const toast = await this.toastController.create({
      message: 'Plato añadido a su orden',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
