import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { FontIcon } from "../font/font.model";

@Component({
  selector: 'server-status',
  templateUrl: './server-status.component.html',
})
export class ServerStatusComponent implements OnInit, OnDestroy {

    @Input("configs")
        set config(value) { this._bs.next(value); };
        get config() { return this._bs.getValue() };

    private _bs = new BehaviorSubject<any>([]);
    private subscription: Subscription;

    public msg: string;
    public icon: FontIcon;

    constructor() { }

    ngOnInit() { 
        this.subscription = this._bs.subscribe( () => {
            this.msg = this.config.errMensage;
            this.icon = this.config.fontAwsomeIcon;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
