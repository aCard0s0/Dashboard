import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServiceManager } 	from 'app/services/service.manager';
import { GaugeModel } 	from "./gauge.model";
import { BehaviorSubject } 	from 'rxjs/BehaviorSubject';
import { Subscription }   	from 'rxjs/Subscription';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html'
})
export class GaugeComponent implements OnInit {

	//@Input("config")		ideia-> entrarem as configs e fazer a chamada do serviço aqui.
	@Input("details")
      	set details(value: GaugeModel) { this._bs.next(value); }
      	get details(): GaugeModel { return this._bs.getValue() };
    
    private _bs = new BehaviorSubject<any>([]);
	private subscription: Subscription;
	
    public options;
    public max;
		public value;
		public units;
    
    constructor(
			public service: ServiceManager
		) {}

    ngOnInit() {
			this.subscription = this._bs.subscribe( () => {

				this.options = {
					min: this.details.min,
					title: this.details.title
				};
			});
			
			this.max = this.details.total;
			if(this.details.percentage)
				this.value = this.details.perc;
			else
				this.value = this.details.used;
			
			this.units = this.details.units;
		}
		
		ngOnDestroy() {
			this.subscription.unsubscribe();
		}

		private callService() {
		}
}