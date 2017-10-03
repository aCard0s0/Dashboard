import { NgModule, CUSTOM_ELEMENTS_SCHEMA }	from '@angular/core';
import { BrowserModule }        	from '@angular/platform-browser';

// Charts
import { ChartsModule } 			from 'ng2-charts/ng2-charts';

// Components
import { LineChartComponent }		from './line/line.component';
import { PieChartComponent }		from './pie/pie.component';

import { GaugeComponent } from "./gauge/gauge.component";

import { JustgageModule } from 'angular2-justgage';

// including below was the fix for ionic2.
// import 'chart.js' import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
	imports: [
		BrowserModule,
		ChartsModule,		
		JustgageModule
	],
	declarations: [
		LineChartComponent,
		PieChartComponent,
		GaugeComponent
	],
	exports: [
		LineChartComponent,
		PieChartComponent,
		GaugeComponent
	],
	providers: [
	],
	schemas: [ 
		CUSTOM_ELEMENTS_SCHEMA 
	]
})
export class MyChartModule {}