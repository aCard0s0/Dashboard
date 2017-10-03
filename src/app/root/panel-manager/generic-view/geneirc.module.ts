import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Components
import { GenericViewComponent }   from './generic.component';


@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		GenericViewComponent
	],
	exports: [
		GenericViewComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class GenericViewModule {}