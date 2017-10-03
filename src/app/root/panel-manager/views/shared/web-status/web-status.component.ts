import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceManager }           from 'app/services/service.manager'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { WebStatus } from "../web-status/web-status.model";

@Component({
  selector: 'web-status',
  templateUrl: './web-status.component.html',
  styleUrls: ['./style.css']
})
export class WebStatusComponent implements OnInit, OnDestroy {

    @Input("configs")
        set configs(value: any[]) { this._bs.next(value); }
        get configs(): any[] { return this._bs.getValue() };
        
    private _bs = new BehaviorSubject<any>([]);
    private subscription: Subscription;
    private flags: boolean[];

    public webStatus: WebStatus[];
    public rightArr: WebStatus[];
    public leftArr: WebStatus[];

    private timer;

    constructor(
        public service: ServiceManager
    ) {}

    ngOnInit() {

        this.subscription = this._bs.subscribe( () => {

            this.webStatus = [];
            this.configs.forEach( (elem, i) => {
                this.webStatus[i] = new WebStatus(elem);
            });
            this.callService();
        });            
    }
    
    ngAfterViewInit() {
        // timer do refresh
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
        clearInterval(this.timer);
    }
    
    private callService() {

        this.flags = [];
        this.webStatus.forEach( (elem, index) => {

            this.flags[index] = undefined;
            this.service.callService(elem.serviceURL)
                .subscribe(
                    res => {
                        this.webStatus[index].setState(res);
                        this.flags[index] = true;
                    },
                    err => {
                        console.log(err);
                    },
                    () => {
                        // split
                        if( !this.flags.includes(undefined) ) {
                            let temp = this.webStatus.length-Math.floor(this.webStatus.length/2);
                            this.leftArr = this.webStatus.splice(0, temp); 
                            this.rightArr = this.webStatus;
                        }
                    }
            );
        });
    }
}