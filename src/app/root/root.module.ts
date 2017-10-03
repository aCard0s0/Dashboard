import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';

import { RootComponent }      from './root.component';
import { PanelModule }        from './panel/panel.module';
import { PanelManagerModule } from './panel-manager/panel-manager.module';
import { FileReaderModule }   from './file-reader/file-reader.module';

@NgModule({
    imports: [
        BrowserModule,
        PanelModule,
        PanelManagerModule,
        FileReaderModule
    ],
    declarations: [
        RootComponent,
    ],
    exports: [
        RootComponent,
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class RootModule {}