import { NgModule, CUSTOM_ELEMENTS_SCHEMA }	from '@angular/core';
import { BrowserModule }    			from '@angular/platform-browser';
import { RouterModule }     			from '@angular/router';
import { FileReaderComponent }	        from './file-reader.component';
import { ServiceManager }               from '../../services/service.manager';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
         FileReaderComponent ,
    ],
    exports: [
         FileReaderComponent 
    ],
    providers: [
        ServiceManager
    ],
    schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA 
    ]
})
export class FileReaderModule {}