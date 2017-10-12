import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceManager }           from 'app/services/service.manager'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';
import { Table }	from '../table.model';
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

    public tables: Table[] = [];
    private timers: Array<any>;

	constructor(
		public service: ServiceManager
	) { }

	ngOnInit() {

		this.subscription = this._bs.subscribe( () => {
			
			this.tables = [];
			this.view.forEach( (table, i) => {
				this.tables[i] = new Table(table);
			});
			// frist display
			this.tables.forEach( (table, i) => {
				this.workflow(table, i);
			});
		});
	}

	ngAfterViewInit() {

		this.timers = [];
		this.tables.forEach( (table, i) => {
		  	this.timers[i] = setInterval( () => {
				this.workflow(table, i);
			}, table.serviceInterval);
		});
	}

	ngOnDestroy() {

		this.subscription.unsubscribe();
		this.timers.forEach(time => {
			clearInterval(time);
		});
	}

	private workflow(table: Table, i: number) {
		
		if(table.needToConfigUrl()){
			table.configUrl();
		}
		this.callService(table.serviceURL, i);
	}

	private callService(url: string, index: number) {
		this.service.callService(url)
		  .subscribe(
				res => {   // success
					this.tables[index].setData(res);
				},
				err => {  // fail
					console.log(err)
				}
		  );
	  }
}