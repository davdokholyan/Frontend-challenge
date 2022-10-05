import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsRouterPluginModule } from "@ngxs/router-plugin";
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthenticationState } from "./core/store/authentication.state";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgxsStoragePluginModule.forRoot({
      key: ['auth.userToken',
        'auth.authUsers',
        'auth.user']
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
