// src/app/models/dispositivo.class.ts
export class Dispositivo {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;
    ultimaMedicion?: {
        valor: string;
    };

    constructor(id: number, nombre: string, ubicacion: string, electrovalvulaId: number) {
        this.dispositivoId = id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.electrovalvulaId = electrovalvulaId;
    }
}