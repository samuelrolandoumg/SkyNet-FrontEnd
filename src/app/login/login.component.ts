// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   constructor(private router: Router, private route: ActivatedRoute) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       if (params['token']) {
//         localStorage.setItem('authToken', params['token']);
//         localStorage.setItem('nombreUsuario', params['nombre']);
//         localStorage.setItem('rolUsuario', params['rol']);
//         this.router.navigate(['/dashboard']);
//       }

//       if (params['error'] === '403') {
//         this.router.navigate(['/access-denied']);
//       }
//     });
//   }

//   loginWithGoogle() {
//     window.location.href = 'http://localhost:3000/auth/google';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        localStorage.setItem('authToken', params['token']);
        localStorage.setItem('nombreUsuario', params['nombre']);
        localStorage.setItem('rolUsuario', params['rol']);

        // Verificar el rol del usuario
        const rol = params['rol'];
        if (rol === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (rol === 'operador') {
          window.location.href = 'https://www.canva.com/design/DAGgoUenicg/saXqUNtbKWJQzjXweUWliw/view?mode=prototype#pantalla-principal-tf';
        }
      }

      if (params['error'] === '403') {
        this.router.navigate(['/access-denied']);
      }
    });
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  }
}
