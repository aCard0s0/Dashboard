import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Components
import { UsersComponent }     from './users.component';

@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		UsersComponent,
	],
	exports: [
		UsersComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class UsersModule {}