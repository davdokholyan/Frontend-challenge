import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthenticationState } from "./core/store/authentication.state";
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  NotFoundComponent
} from './shared/components/index';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsStoragePluginModule.forRoot({
      key: ['auth.userToken',
        'auth.authUsers']
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([AuthenticationState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
