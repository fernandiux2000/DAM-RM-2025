// src/app/services/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Importar Observable

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Añadir el tipo de retorno Observable<any>
  getDispositivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dispositivos`);
  }
  
  // ... resto de los métodos ...
  getDispositivo(id: string) {
    return this.http.get(`${this.apiUrl}/dispositivos/${id}`);
  }

  getMediciones(dispositivoId: string) {
    return this.http.get(`${this.apiUrl}/dispositivos/${dispositivoId}/mediciones`);
  }

  accionarValvula(electrovalvulaId: number, dispositivoId: number, apertura: number) {
    const body = { dispositivoId, apertura };
    return this.http.post(`${this.apiUrl}/electrovalvulas/${electrovalvulaId}/accionar`, body);
  }
}