import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root', // Certifique-se que o AuthService é fornecido na raiz
})
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword = false;
  loginSocial = true;
  animationClass: string = '';
  userLoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userLoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSocial() {
    if (this.loginSocial) {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.loginSocial = !this.loginSocial;
        this.animationClass = 'fade-in';
      }, 500); // Tempo da animação em ms
    } else {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.loginSocial = !this.loginSocial;
        this.animationClass = 'fade-in';
      }, 500);
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  userLogin() {
    this.authService.userLogin(this.userLoginForm.value).subscribe((response: any) => {
      console.log(response);
    });
  }
}
