import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';

import { FontModule } from "../font/font.module";

import { ServerStatusComponent } from "./server-status.component";


@NgModule({
    imports: [
		BrowserModule,
		FontModule
    ],
	declarations: [
        ServerStatusComponent
	],
	exports: [
		ServerStatusComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ServerStatusModule {}