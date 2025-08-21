import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { PorcentajePipe } from '../pipes/porcentaje.pipe';
import { ColorHumedadDirective } from '../directives/color-humedad.directive';

@Component({
  selector: 'app-dispositivo-detalle',
  templateUrl: './dispositivo-detalle.page.html',
  styleUrls: ['./dispositivo-detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PorcentajePipe, ColorHumedadDirective]
})
export class DispositivoDetallePage implements OnInit {
  public dispositivo: any;
  public isValvulaAbierta = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getDispositivo(id).subscribe(data => {
        this.dispositivo = data;
      });
    }
  }

  accionarValvula() {
    this.isValvulaAbierta = !this.isValvulaAbierta;
    const estadoApertura = this.isValvulaAbierta ? 1 : 0;
    const mensaje = this.isValvulaAbierta ? 'Válvula abierta' : 'Válvula cerrada';

    this.apiService.accionarValvula(
      this.dispositivo.electrovalvulaId,
      this.dispositivo.dispositivoId,
      estadoApertura
    ).subscribe(() => {
      this.mostrarToast(`${mensaje} y medición registrada.`);
      this.cargarDatos();
    });
  }

  verHistorial() {
    this.router.navigate(['/mediciones-historial', this.dispositivo.dispositivoId]);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}