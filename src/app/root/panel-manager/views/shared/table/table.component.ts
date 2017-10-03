import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TableModel } from './table.model';

@Component({
  selector: 'mytable',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  private _bs = new BehaviorSubject<any>([]);

  @Input("table")
    set table(value: TableModel) { this._bs.next(value); }
    get table(): TableModel { return this._bs.getValue() };

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
    this.tableTitle = this.table.tableTitle || "";    // table.tableTitle or default
    this.tableFooter = this.table.tableFooter || "";
    this.tableHeader = [];
    this.tableData = [];

    this.table.tableData.forEach( elem => {
      this.tableHeader.push(elem.header);
    });

    for(let j=0; j < this.table.tableData[0].data.length; j++){  // Atenção! assume-se que tem o mesmo tamanho
      this.tableData[j] = [];
      for(let i=0; i < this.table.tableData.length; i++) {
        this.tableData[j].push(this.table.tableData[i].data[j])
      }
    }
  }

}
