import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceManager }           from 'app/services/service.manager'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { TableModel, TableData }	from '../table.model';
import { TableView } 							from '../../../views.model';

@Component({
  selector: 'table-wrapper',
  templateUrl: './table-wrapper.component.html'
})
export class TableWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

		@Input("tablesView")
			set view(value) { this._bs.next(value); }
			get view() { return this._bs.getValue() };

		private _bs = new BehaviorSubject<any>([]);
		private subscription: Subscription;

    public tables: TableModel[];
    private timers: Array<any>;

	constructor(
		public service: ServiceManager
	) { }

	ngOnInit() {

		this.subscription = this._bs.subscribe( () => {

			this.tables = [];
			this.view.forEach( (table) => {
					this.callService(table);
			});
		});
	}

	ngAfterViewInit() {

		this.timers = [];
		this.view.forEach( (table, i) => {
		  this.timers[i] = setInterval( () => {
				this.callService(table);
			}, table.serviceInterval);
		});
	}

	ngOnDestroy() {

		this.subscription.unsubscribe();
		this.timers.forEach(time => {
			clearInterval(time);
		});
	}

	callService(table: TableView) {
		
		let tableResult: TableModel;
		let tDataResult: TableData[];
		this.service.callService(table.serviceURL)
		  .subscribe(
				res => {   // success
					tDataResult = new Array<TableData>(res.length);
					for(let i=0; i < res.length; i++){
					tDataResult[i] = new TableData(res[i].colName, res[i].colValues);
					}
				},
				err => {  // fail
					console.log(err)
				},
				() => {   // finally on success
					tableResult = new TableModel(tDataResult);
					tableResult.tableTitle = table.title;
					tableResult.tableFooter = table.footer;
					this.tables.push( tableResult );
          if (this.tables.length > 2){
            this.tables = this.tables.slice(this.tables.length-1, this.tables.length)
					}
				}
		  );
	  }
}