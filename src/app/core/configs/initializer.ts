import { Injector } from '@angular/core';
import { ENV } from '../../../main';
import { ConfigService } from './config.service';
import { EnvironmentService } from './environment.service';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { KeycloakService, KeycloakOptions } from 'keycloak-angular';

export function initializer(
  keycloak: KeycloakService,
  configService: ConfigService,
  env: EnvironmentService,
  injector: Injector
): () => Promise<boolean> {
  if (!env.isInitialized()) {
    env.setEnv(injector.get(ENV));
  }
  const options: KeycloakOptions = {
    config: {
      url: env.environment.outh2.url,
      realm: env.environment.outh2.realm,
      clientId: env.environment.outh2.clientId,
    },
    bearerPrefix: 'Bearer',
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    },
    bearerExcludedUrls: [],
  };
  return () =>
    from(configService.init())
      .pipe(
        // mergeMap(() => keycloak.init()),
        mergeMap(() => keycloak.init(options)),
        catchError((error) => {
          console.error('Error initializing app', error);
          return of(error);
        }),
        finalize(() => {
          () => keycloak.init();
          console.log('App initialized');
        })
      )
      .toPromise();

  // return () => keycloak.init(options);
}
