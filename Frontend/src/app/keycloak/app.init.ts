import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://3.128.226.40:8080/auth/',
          realm: 'angular-karaoke',
          clientId: 'karaoke-client',
        },
        initOptions: {
          checkLoginIframe: false,
        },
      });
  }