import { Component, NgZone, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { UbicacionDto } from '../../interfaces/cliente.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-ubicacion-cliente',
  templateUrl: './ver-ubicacion-cliente.component.html',
  styleUrl: './ver-ubicacion-cliente.component.css',
  standalone: true,
  imports: []
})
export class VerUbicacionClienteComponent implements OnInit {

  clienteSeleccionado!: UbicacionDto;
  distancia!: string;
  duracion!: string;

  constructor(
    private clienteSrv: ClienteService,
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    const nav = history.state;
    const idCliente = nav?.cliente?.idCliente;

    if (!idCliente) {
      alert('No se proporcionó ID de cliente');
      return;
    }

    this.clienteSrv.obtenerUbicacionClientePorId(idCliente).subscribe(data => {
      this.clienteSeleccionado = data;
      this.cargarMapa();
    });
  }

  cargarMapa(): void {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDV_9CAkhhnP7-AlMZH13sgj5JW8ePj1qA&callback=initMap';
    script.async = true;
    (window as any)['initMap'] = () => this.initMap();
    document.body.appendChild(script);
  }

  initMap(): void {
    navigator.geolocation.getCurrentPosition(pos => {
      const origen = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      const destino = {
        lat: parseFloat(this.clienteSeleccionado.latitud),
        lng: parseFloat(this.clienteSeleccionado.longitud)
      };

      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: origen,
        zoom: 14
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route({
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);

          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);

            const leg = result.routes[0].legs[0];
            this.zone.run(() => {
              this.distancia = leg.distance?.text ?? 'Distancia desconocida';
              this.duracion = leg.duration?.text ?? 'Duración desconocida';
            });

          } else {
            alert('No se pudo calcular la ruta');
          }

        } else {
          alert('No se pudo calcular la ruta');
        }
      });
    });
  }

  abrirEnGoogleMaps() {
    navigator.geolocation.getCurrentPosition(pos => {
      const origen = `${pos.coords.latitude},${pos.coords.longitude}`;
      const destino = `${this.clienteSeleccionado.latitud},${this.clienteSeleccionado.longitud}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origen}&destination=${destino}&travelmode=driving`;
      window.open(url, '_blank');
    }, error => {
      alert('No se pudo obtener tu ubicación actual para abrir Google Maps.');
    });
  }


}
