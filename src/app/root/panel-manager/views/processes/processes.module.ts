import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';

// Modules
import { MyChartModule }        from '../shared/charts/charts.module';

// Components
import { ProcessesComponent }   from './processes.component';


@NgModule({
	imports: [
		BrowserModule,
		MyChartModule
	],
	declarations: [
		ProcessesComponent
	],
	exports: [
		ProcessesComponent
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProcessesModule {}