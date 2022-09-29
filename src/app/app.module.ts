import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  NotFoundComponent
} from './shered/components/index';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule,
      NgxsModule.forRoot([], {
    developmentMode: !environment.production
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
