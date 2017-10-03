import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'db',
  templateUrl: './db.component.html'
})
export class DBComponent implements OnInit {

  @Input("view")
    set view(value) { this._bs.next(value); }
    get view() { return this._bs.getValue() };
  
  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;

  public tables;
  private timers: Array<any>;

  constructor() { }

  ngOnInit() {
    this.subscription = this._bs.subscribe( () => {
      this.tables = this.view.tables;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

/* this.table = {
  tableTitle:"qwe",      
  tableData: [
    {header:"Tipo", data:["Full Backup", "Full Backup", "Transaction Log","Transaction Log","Transaction Log","Transaction Log","Transaction Log"]},
    {header:"Data & Hora", data:["2017-08-11 20:06:26", " ", " "," "," "," "," "]},
    {header:"Tamanho", data:["123 GB", "123 GB", "123 GB","123 GB","123 GB","123 GB","123 GB"]},
  ],
  tableFooter:"",
} */