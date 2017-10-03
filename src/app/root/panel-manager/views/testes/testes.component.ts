import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'testes',
  templateUrl: './testes.component.html'
})
export class TestesComponent implements OnInit, OnDestroy {

  @Input("view") 
    set view(value) { this._bs.next(value); }
    get view() { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;

  public tables;

  constructor(
  ) { }

  ngOnInit() {

    this.subscription = this._bs.subscribe( () => {

      this.tables = this.view.tables;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}