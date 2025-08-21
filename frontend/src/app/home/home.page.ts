import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Dispositivo } from '../models/dispositivo.class';
// Importar el módulo de gráficos
import { NgCircleProgressModule } from 'ng-circle-progress';
// Importar operadores de RxJS
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // Ahora el imports es más simple
  imports: [
    IonicModule,
    CommonModule,
    NgCircleProgressModule
  ],
})
export class HomePage {
  public dispositivos: Dispositivo[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ionViewWillEnter() {
    this.cargarDispositivos();
  }

  cargarDispositivos() {
    this.apiService.getDispositivos().pipe(
      switchMap((dispositivos: any[]) => {
        if (!dispositivos || dispositivos.length === 0) {
          return of([]);
        }
        const observables = dispositivos.map(d =>
          this.apiService.getDispositivo(d.dispositivoId.toString()).pipe(
            map((detalle: any) => {
              const dispositivo = new Dispositivo(d.dispositivoId, d.nombre, d.ubicacion, d.electrovalvulaId);
              dispositivo.ultimaMedicion = detalle.ultimaMedicion;
              return dispositivo;
            })
          )
        );
        return forkJoin(observables);
      })
    ).subscribe({
      next: (dispositivosCompletos: Dispositivo[]) => {
        this.dispositivos = dispositivosCompletos;
      },
      error: (err) => console.error('Error al cargar dispositivos:', err),
    });
  }

  verDetalle(dispositivoId: number) {
    this.router.navigate(['/dispositivo-detalle', dispositivoId]);
  }

  getHumedadPercent(dispositivo: Dispositivo): number {
    return dispositivo.ultimaMedicion ? Number(dispositivo.ultimaMedicion.valor) : 0;
  }
}