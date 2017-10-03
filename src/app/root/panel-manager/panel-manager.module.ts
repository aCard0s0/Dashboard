import { NgModule, CUSTOM_ELEMENTS_SCHEMA }	from '@angular/core';
import { BrowserModule }    			    			from '@angular/platform-browser';
import { RouterModule }     			    			from '@angular/router';
import { PanelManagerComponent }	        	from './panel-manager.component';
import { ViewsModule }                      from './views/views.module';

import { GenericViewModule } from "./generic-view/geneirc.module";
import { MenuViewModule } from "./menu-view/menu.module";

@NgModule({
	imports: [
		BrowserModule,
		ViewsModule,
		GenericViewModule,
		MenuViewModule
	],
	declarations: [
		PanelManagerComponent,
	],
	exports: [
		PanelManagerComponent
	],
	schemas: [ 
		CUSTOM_ELEMENTS_SCHEMA 
	]
})
export class PanelManagerModule {}