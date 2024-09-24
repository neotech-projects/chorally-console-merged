import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { InjectionToken } from '@angular/core';

export const ENV = new InjectionToken<any>('env');

const boostrap = async () => {
  const response = await fetch('/assets/environment.json');
  if (!response.ok) {
    throw new Error(`Failed to load config: ${response.statusText}`);
  }
  const config = await response.json();
  (window as any).__env = config;
  platformBrowserDynamic([{ provide: ENV, useValue: config }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

boostrap();



  




