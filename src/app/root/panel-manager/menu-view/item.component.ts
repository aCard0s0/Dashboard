import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ServiceManager } from 'app/services/service.manager';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'menuItem',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input("item") 
    set item(value) { this._bs.next(value); }
    get item() { return this._bs.getValue() };

  @Output("notifier")
    notify: EventEmitter<string> = new EventEmitter()
  
  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private displayTimer;

  public selectItem;

  constructor(
    public service: ServiceManager
  ) { 
  }

  ngOnInit() {
    
    this.subscription = this._bs.subscribe( () => {

        if(this.displayTimer){
          clearTimeout(this.displayTimer);
        }
        this.selectItem = this.item.view;        // aqui é a view que tratamos
        this.timer();
    });
  }

  /**
   *    Time that this item will be dysplay
   */
  private timer(){

    this.displayTimer = setTimeout( ()=> {

        this.notify.emit();
        clearTimeout(this.displayTimer);
    },  this.item.getDisplayTime() );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}