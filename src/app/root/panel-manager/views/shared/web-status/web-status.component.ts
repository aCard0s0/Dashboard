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

    @Input("webStatus")
        set configs(value) { this._bs.next(value); }
        get configs() { return this._bs.getValue() };
        
    private _bs = new BehaviorSubject<any>([]);
    private subscription: Subscription;
    private flags: boolean[];

    public webStatus: WebStatus[];
    public rightArr: WebStatus[];
    public leftArr: WebStatus[];

    private timers: any[];

    constructor(
        public service: ServiceManager
    ) {}

    ngOnInit() {

        this.subscription = this._bs.subscribe( () => {

            this.webStatus = [];
            this.configs.websites.forEach( (elem, i) => {
                this.webStatus[i] = new WebStatus(elem);
            });
            this.callService();
        });            
    }
    
    ngAfterViewInit() {
        
        this.timers = [];

		this.webStatus.forEach( (web, i) => {
		  this.timers[i] = setInterval( () => {

				this.callService();
			}, this.configs.serviceInterval);
		});
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.timers.forEach(time => {
			clearInterval(time);
		});
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
                        // split  -- pedreiro ??
                        if( !this.flags.includes(undefined) ) {
                            let temp = this.webStatus.length-Math.floor(this.webStatus.length/2);
                            let x =0, y=0;
                            this.leftArr = [];
                            this.rightArr = [];
                            for(let i=0; i < this.webStatus.length; i++) {
                                if (i < temp) {
                                    this.leftArr[x] = this.webStatus[i];
                                    x++;
                                }
                                else {
                                    this.rightArr[y] = this.webStatus[i];
                                    y++;
                                }
                            }
                        }
                    }
            );
        });
    }
}