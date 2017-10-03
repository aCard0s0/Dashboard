import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Components
import { TableComponent }   from './table.component';
import { TableWrapperComponent } from "./table-wrapper/table-wrapper.component";


@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		TableComponent,
		TableWrapperComponent
	],
	exports: [
		TableComponent,
		TableWrapperComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class TableModule {}