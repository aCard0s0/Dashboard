import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

import { FontModule } from "../font/font.module";

// Components
import { WebStatusComponent }     from './web-status.component';

@NgModule({
	imports: [
		BrowserModule,
		FontModule
	],
	declarations: [
		WebStatusComponent,
	],
	exports: [
		WebStatusComponent
	]
})
export class WebStatusModule {}