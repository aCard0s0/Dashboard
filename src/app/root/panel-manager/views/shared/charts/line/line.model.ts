import { JsonProperty } from 'json-typescript-mapper';
import { DateConfig } from 'app/structures/date-config.model';

export class LineChartDataModel {

    label:  string;
    data:   Array<number>;

    constructor(label:string, data:Array<number>) {
        this.label = label;
        this.data = data;
    }
}

export class LineChartOption {

    animation: boolean;
    responsive: boolean;

    constructor() {
        this.animation = false;     // ?
        this.responsive = true;
    }
}

export class LineChartModel {

    data:            Array<LineChartDataModel>;    // provide by service
   
    @JsonProperty('type')
    type:            string;
    @JsonProperty({clazz: DateConfig, name: 'dateConfig'})
    dateConfig:      DateConfig;
    @JsonProperty('serviceUrl')
    serviceUrl:      string;
    @JsonProperty('xAxisModel')
    xAxisModel:      string;
    @JsonProperty('xAxisLabel')
    xAxisLabel:      string[];
    @JsonProperty('legend')
    legend:          boolean;
    @JsonProperty('serviceInterval')
    serviceInterval: number;

    options:         LineChartOption;       // defaults values, not changeable yet

    constructor() {
        this.type = undefined;
        this.dateConfig = undefined;        
        this.serviceUrl = undefined;
        this.xAxisModel = undefined;
        this.xAxisLabel = undefined;
        this.legend = undefined;
        this.serviceInterval = undefined;
    }
}

/*public colors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];*/