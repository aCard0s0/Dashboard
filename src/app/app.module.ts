import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router }         from './app.routing'
import { JsonpModule, HttpModule }      from "@angular/http";

import { AppComponent }     from './app.component';
import { ServiceManager } 	from './services/service.manager';

// modules
import { RootModule }     from './root/root.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Router,
    JsonpModule,
    HttpModule,
    RootModule,
  ],
  providers: [
    ServiceManager
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
