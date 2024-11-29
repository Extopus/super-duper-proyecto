import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedDishes: any[] = []; 

  constructor() { }

  addDish(dish: any) {
    this.selectedDishes.push(dish);
  }

  getSelectedDishes(): any[] {
    return this.selectedDishes;
  }

  removeDish(dish: any) {
    this.selectedDishes = this.selectedDishes.filter(p => p !== dish);
  }

  clearOrder() {
    this.selectedDishes = [];
  }
}
