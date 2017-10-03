import { Component, OnInit, OnDestroy, Input, Output, EventEmitter }    from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Subscription} from 'rxjs/Subscription';
import {ServiceManager} from "app/services/service.manager";

@Component({
  selector: 'panel-manager',
  templateUrl: './panel-manager.component.html',
})
export class PanelManagerComponent implements OnInit, OnDestroy {

  @Input("selectPanel")
    set panel(value) { this._bs.next(value); }
    get panel() { return this._bs.getValue(); }

  @Output("notifier")	 
    notify: EventEmitter<string> = new EventEmitter();

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private idView: number;     // Active View ID
  
  public  selectedView;       // View on display
  
  constructor(
    private http: ServiceManager
  ) { 
  }

  ngOnInit() {
    this.subscription = this._bs.subscribe( () => {
        this.idView = 0;
        this.selectedView = this.panel.views[this.idView];
    });
  }

  /**
   *  
   */
  public nofityNextView() {

    this.idView++;
    if(this.idView < this.panel.views.length) {
      this.selectedView = this.panel.views[this.idView];

    } else {
      this.idView = 0;      // reset
      this.notify.emit();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
