import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'generic-view',
  templateUrl: './generic.component.html',
})
export class GenericViewComponent implements OnInit {

  @Input("view")
    set view(value) { this._bs.next(value); }
    get view() { return this._bs.getValue() };
  
  @Output("notifier")
    notify: EventEmitter<string> = new EventEmitter()

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private displayTimer;

  public data;

  constructor() { }

  ngOnInit() {

    this.subscription = this._bs.subscribe( () => {
      
        this.data = this.view.data  // aqui é a view que tratamos
        this.timer();
    });
  }

  private timer(){
    
    this.displayTimer = setTimeout( ()=> {

        this.notify.emit();
        clearTimeout(this.displayTimer);
    },  this.view.displayTime);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
