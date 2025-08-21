import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorHumedad]',
  standalone: true,
})
export class ColorHumedadDirective implements OnChanges {
  @Input('appColorHumedad') valorHumedad: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const humedad = Number(this.valorHumedad);
    let color = 'dark';

    if (isNaN(humedad)) {
      color = 'dark';
    } else if (humedad < 30) {
      color = 'warning';
    } else if (humedad > 70) {
      color = 'primary';
    } else {
      color = 'success';
    }
    this.renderer.setAttribute(this.el.nativeElement, 'color', color);
  }
}