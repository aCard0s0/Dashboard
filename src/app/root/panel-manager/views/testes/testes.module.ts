import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

import { TableModule } from "../shared/table/table.module";

// Components
import { TestesComponent }     from './testes.component';

@NgModule({
	imports: [
		BrowserModule,
		TableModule
	],
	declarations: [
		TestesComponent,
	],
	exports: [
		TestesComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class TestesModule {}