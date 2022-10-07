import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'efactura',
        url: 'http://localhost:8080/auth',
        clientId: 'login-app'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
      },
      bearerExcludedUrls: []
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
