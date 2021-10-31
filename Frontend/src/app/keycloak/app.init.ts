import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://18.219.30.29:8080/auth/',
          realm: 'angular-karaoke',
          clientId: 'karaoke-client',
        },
        initOptions: {
          checkLoginIframe: false,
        },
      });
  }