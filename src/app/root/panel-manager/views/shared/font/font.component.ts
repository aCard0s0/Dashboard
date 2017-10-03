import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'font',
  templateUrl: './font.component.html',
})
export class FontComponent implements OnInit {

    @Input("config") 
        set config(value: any) { this._bs.next(value); }
        get config(): any { return this._bs.getValue() };
    
    private _bs = new BehaviorSubject<any>([]);
    private subscription: Subscription;

    public icon;
    public color;

    constructor(
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.subscription = this._bs.subscribe( () => { 
            this.icon = this.config;
            this.color = this.config.style? this.sanitizer.bypassSecurityTrustStyle(this.config.style) : "";
        });
    }
}
