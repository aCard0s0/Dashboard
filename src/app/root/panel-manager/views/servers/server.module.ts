import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Modules
import { MyChartModule }        from '../shared/charts/charts.module';
import { ServerStatusModule }	from "../shared/server-status/server-status.module";

// Components
import { ServerComponent }   from './server.component';


@NgModule({
	imports: [
		BrowserModule,
		MyChartModule,
		ServerStatusModule
	],
	declarations: [
		ServerComponent
	],
	exports: [
		ServerComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ServerModule {}