import { NgModule }         	from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Components
import { MenuComponent }     	from './menu.component';
import { ItemComponent } 		from "./item.component";
import { ViewsModule } 			from "../views/views.module";

@NgModule({
	imports: [
		BrowserModule,
		ViewsModule
	],
	declarations: [
		MenuComponent,
		ItemComponent
	],
	exports: [
		MenuComponent,
		ItemComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MenuViewModule {}