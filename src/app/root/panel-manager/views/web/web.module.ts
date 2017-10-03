import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

import { TableModule } from "../shared/table/table.module";
import { WebStatusModule } from "../shared/web-status/web-status.module";

// Components
import { WebComponent }     from './web.component';

@NgModule({
	imports: [
		BrowserModule,
		TableModule,
		WebStatusModule
	],
	declarations: [
		WebComponent,
	],
	exports: [
		WebComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class WebModule {}