import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario: any = { nombre: '', rol: '' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  logout() {
  }

  // redirigiragregarIventario() {
  //   this.router.navigate(['/agregar-inventario']);
  // }
  
}

