import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const authConfigFacebook: AuthConfig = {
  loginUrl: 'https://www.facebook.com/v11.0/dialog/oauth',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: '1527071504600584',
  responseType: 'token',
  scope: 'public_profile email',
  oidc: false,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true
};

const authConfigGoogle: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/auth/callback',
  clientId: '1088646860176-dli8cvcdqm4ush61vft5i7u992bscdj5.apps.googleusercontent.com',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentProvider: 'FACEBOOK' | 'GOOGLE' = 'FACEBOOK';

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureFacebookAuth();
  }

  private configureFacebookAuth() {
    this.currentProvider = 'FACEBOOK';
    this.oauthService.configure(authConfigFacebook);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private configureGoogleAuth() {
    this.currentProvider = 'GOOGLE';
    this.oauthService.configure(authConfigGoogle);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithFacebook() {
    this.configureFacebookAuth();
    this.oauthService.initImplicitFlow();
  }

  loginWithGoogle() {
    this.configureGoogleAuth();
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  handleLoginCallback() {
    return this.oauthService.tryLogin();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get userProfile() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  private apiUrl = 'http://localhost:3000/api/v1/auth'



  entrar(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }

  userLogin(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }

  cadastro(dadosCadastro: any) {
    return this.http.post(`${this.apiUrl}/register`, dadosCadastro);
  }

}
