import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';

import { FontComponent } from "./font.component";

// 3rd party software
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

@NgModule({
    imports: [
        BrowserModule,
        AngularFontAwesomeModule
    ],
	declarations: [
        FontComponent
	],
	exports: [
        FontComponent
	]
})
export class FontModule {}