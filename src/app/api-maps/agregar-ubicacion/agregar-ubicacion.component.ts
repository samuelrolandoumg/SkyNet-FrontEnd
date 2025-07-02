import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CrearClienteDto } from '../../interfaces/cliente.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./agregar-ubicacion.component.css'] // Ojo: era `styleUrl`, corregido a `styleUrls`
})
export class AgregarUbicacionComponent implements OnInit {

  latitud: number | null = null;
  longitud: number | null = null;
  nombre: string = '';

  constructor(private http: HttpClient, private zone: NgZone, private clienteSrv: ClienteService) { }

  ngOnInit(): void {
    this.cargarMapa();
  }

  cargarMapa(): void {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDV_9CAkhhnP7-AlMZH13sgj5JW8ePj1qA&callback=initMap';
    script.async = true;
    (window as any)['initMap'] = () => this.initMap();
    document.body.appendChild(script);
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 14.6349, lng: -90.5069 },
      zoom: 14,
    });

    let marker: google.maps.Marker;

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      const position = e.latLng;
      if (!position) return;

      if (marker) marker.setMap(null);

      marker = new google.maps.Marker({
        position,
        map,
      });

      // Forzar actualización del estado dentro del contexto de Angular
      this.zone.run(() => {
        this.latitud = position.lat();
        this.longitud = position.lng();
      });
    });
  }

  guardar(): void {
    if (this.latitud && this.longitud && this.nombre.trim()) {
      const cliente = {
        nombre: this.nombre,
        latitud: this.latitud.toString(),
        longitud: this.longitud.toString()
      };

      this.clienteSrv.crearCliente(cliente).subscribe({
        next: res => alert('Cliente guardado correctamente'),
        error: err => alert('Error al guardar el cliente')
      });
    }
  }

}
