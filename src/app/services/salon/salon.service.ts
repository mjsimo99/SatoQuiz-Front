import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salon } from '../../models/salon/salon';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private apiUrl = 'http://localhost:8080/salons';

  constructor(private Http:HttpClient) { }

  getSalons(): Observable<Salon[]> {
    return this.Http.get<Salon[]>(`${this.apiUrl}/all`);
  }





}
