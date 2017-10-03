import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';

// Components
import { DBComponent }   from './db.component';
import { TableModule } from '../shared/table/table.module';


@NgModule({
	imports: [
		BrowserModule,
		TableModule
	],
	declarations: [
		DBComponent
	],
	exports: [
		DBComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DBModule {}