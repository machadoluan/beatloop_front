// auth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '././services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Processando login...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.handleAuthentication();
  }

  private async handleAuthentication() {
    try {
      await this.authService.handleLoginCallback();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro durante autenticação:', error);
      // Redireciona para página de erro ou login
      this.router.navigate(['/login']);
    }
  }
}
