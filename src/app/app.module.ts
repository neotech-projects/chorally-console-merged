import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HeaderComponent,
  LayoutComponent,
  SidenavComponent,
  SidenavChildrenComponent,
} from './layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './core/configs/config.service';
import { initializer } from './core/configs/initializer';
import { EnvironmentService } from './core/configs/environment.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';


import {
  KeycloakAngularModule,
  KeycloakBearerInterceptor,
  KeycloakService,
} from 'keycloak-angular';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SpinnerService } from './core/services/spinner/spinner.service';
import { SpinnerInterceptor } from './core/interceptors/spinner/spinner.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

const APP_CONTAINERS = [
  HeaderComponent,
  LayoutComponent,
  SidenavComponent,
  SidenavChildrenComponent,
  SpinnerComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    HttpClientModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, ConfigService, EnvironmentService, Injector],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
