import { JsonProperty } from 'json-typescript-mapper';
import { DateConfig } from 'app/structures/date-config.model';

export class PieChartDataModel {

    label:  string;
    data:   number;

    constructor(label:string, data:number) {
        this.label = label;
        this.data = data;
    }
}

export class PieChartModel {

    public data:        number[];       // provide by service
    public dataLabels:  string[];
    
    @JsonProperty('type')
    public type:        string;
    @JsonProperty({clazz: DateConfig, name: 'dateConfig'})
    dateConfig:      DateConfig;
    @JsonProperty('serviceUrl')
    public serviceUrl:  string;
    @JsonProperty('serviceInterval')
    serviceInterval: number;

    constructor() {
        this.data = undefined;
        this.dateConfig = undefined;
        this.serviceUrl = undefined;
        this.dataLabels = undefined;
        this.type = undefined;
        this.serviceInterval = undefined;
    }
}

