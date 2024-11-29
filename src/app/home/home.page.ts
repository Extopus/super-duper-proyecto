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
export class HomePage implements OnInit {
  username: string = '';
  dishes: Item[] = []; // Change to Item array
  isLoading: boolean = false; // Add loading state
  errorMessage: string = ''; // Error message if something goes wrong

  // Placeholder dish that will be displayed when there are no dishes available
  placeholderDish: Item = {
    id:777,
    name: 'Plato vacio',
    description: 'Un plato vacío',
    price: 1,
    image: 'null' // Path to the placeholder image
  };

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
    this.isLoading = true; // Show loading state
    this.itemService.getItems().subscribe(
      (data) => {
        this.dishes = data; // Set fetched items to dishes
        this.isLoading = false; // Hide loading state
        if (this.dishes.length === 0) {
          this.errorMessage = 'No items available at the moment.';
        }
      },
      (error) => {
        this.isLoading = false; // Hide loading state
        this.errorMessage = 'Error fetching items. Please try again later.';
        console.error(error); // Log error for debugging
      }
    );
  }

  async addDish(dish: Item) {
    this.orderService.addDish(dish);
    const toast = await this.toastController.create({
      message: 'Plato añadido a su orden',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
