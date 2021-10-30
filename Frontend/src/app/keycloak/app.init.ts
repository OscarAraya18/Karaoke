import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://13.59.50.186:8080/auth/',
          realm: 'angular-karaoke',
          clientId: 'karaoke-client',
        },
        initOptions: {
          checkLoginIframe: false,
        },
      });
  }