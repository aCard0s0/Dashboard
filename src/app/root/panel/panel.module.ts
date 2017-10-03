import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { JsonpModule }          from "@angular/http";
import { RouterModule }         from '@angular/router';

import { PanelTopComponent }    from './panel-top.component';
import { PanelLateralComponent }from './panel-lateral.component';

import { FontModule } from "../panel-manager/views/shared/font/font.module";

@NgModule({
    imports: [
        BrowserModule,
        JsonpModule,
        RouterModule,
        FontModule
    ],
    declarations: [
        PanelTopComponent,
        PanelLateralComponent
    ],
    exports: [
        PanelTopComponent,
        PanelLateralComponent
    ],
    providers: [
        //ServiceManager
    ]
})
export class PanelModule {}