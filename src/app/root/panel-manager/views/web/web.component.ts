import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceManager }           from 'app/services/service.manager'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'web',
  templateUrl: './web.component.html'
})
export class WebComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input("view")
    set view(value) { this._bs.next(value); }
    get view() { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;

  public webStatus;
  public tables;

  constructor(
    public service: ServiceManager
  ) { }

  ngOnInit() {
    this.subscription = this._bs.subscribe( () => {
      
      this.webStatus = this.view.webStatus;
      this.tables = this.view.tables;
    });
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}