import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://18.119.106.198:8080/auth/',
          realm: 'angular-karaoke',
          clientId: 'karaoke-client',
        },
        initOptions: {
          checkLoginIframe: false,
        },
      });
  }