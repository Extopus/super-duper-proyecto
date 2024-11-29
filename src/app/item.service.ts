import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../app/item.model'; // Make sure to create an Item model

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items/'; // Update the URL as needed

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
}
