import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { deserialize } from 'json-typescript-mapper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { MenuItem } from './menu.model';

@Component({
  selector: 'menuView',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input("menu") 
    set menu(value) { this._bs.next(value); }
    get menu() { return this._bs.getValue() };
  @Output("notifier")	
    notifier: EventEmitter<string> = new EventEmitter();

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private idItem: number;
  
  public itens: MenuItem[];
  public selectedItem: MenuItem;
  public timer;

  public itensName: MenuItem[];   //patch for chart problem
  
  constructor() { }

  ngOnInit() {

    this.subscription = this._bs.subscribe( () => {

      this.itens = [];
      this.menu.itens.forEach( (item, i) => {
          this.itens[i] = new MenuItem(item);
      });

      //patch for chart problem, don't show the ones with name
      this.itensName = this.itens.filter( item => item.name != undefined );

      this.idItem = 0;
      this.selectedItem = this.itens[this.idItem];
      this.selectedItem.setEnable();
    });
  }

  /**
   *  on reach the end of menu itens is send a signal to view manager to change the panel
   */
  notify() {

    this.selectedItem.setDisable();
    this.idItem += 1;

    if(this.idItem < this.itens.length) {
      this.selectedItem = this.itens[this.idItem];
      this.selectedItem.setEnable();

    } else {
      this.notifier.emit();
    }
    this.selectedItem.clicked = false;            // set display time as normal
  }

  showItem(item: any) {

    this.selectedItem.setDisable();
    this.idItem = this.itens.findIndex( obj => obj == item );
    this.selectedItem = this.itens[this.idItem];
    this.selectedItem.setEnable();
    this.selectedItem.clicked = true;             // adds more time to display
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }

}