import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Table } from './table.model';

@Component({
  selector: 'mytable',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  private _bs = new BehaviorSubject<any>([]);

  @Input("table")
    set table(value: Table) { this._bs.next(value); }
    get table(): Table { return this._bs.getValue() };

  public tableTitle: string;
  public tableHeader: Array<string>;
  public tableData: Array<any[]>;
  public tableFooter: string;

  constructor() {}

  ngOnInit() {
    this._bs
        .subscribe( () => {
          this.setTable();
        });
  }

  private setTable() {
    this.tableTitle = this.table.title;    // table.tableTitle or default
    this.tableFooter = this.table.footer;
    this.tableHeader = [];
    this.tableData = [];

    this.table.tableData.forEach( elem => {
      this.tableHeader.push(elem.colName);
    });

    for(let j=0; j < this.table.tableData[0].colValues.length; j++){  // Atenção! assume-se que tem o mesmo tamanho
      this.tableData[j] = [];
      for(let i=0; i < this.table.tableData.length; i++) {
        this.tableData[j].push(this.table.tableData[i].colValues[j])
      }
    }
  }

}
