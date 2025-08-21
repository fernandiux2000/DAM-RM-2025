import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mediciones-historial',
  templateUrl: './mediciones-historial.page.html',
  styleUrls: ['./mediciones-historial.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MedicionesHistorialPage implements OnInit {
  public mediciones: any[] = [];
  public dispositivoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.dispositivoId = this.route.snapshot.paramMap.get('id');
    if (this.dispositivoId) {
      this.apiService
        .getMediciones(this.dispositivoId)
        .subscribe((data: any) => {
          this.mediciones = data;
        });
    }
  }
}