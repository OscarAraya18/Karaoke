import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://3.144.7.110:8080/auth/',
          realm: 'angular-karaoke',
          clientId: 'karaoke-client',
        },
        initOptions: {
          checkLoginIframe: false,
        },
      });
  }