export class GaugeConfigs {

    title: string;
    min: number;
    max: number;
    percentage: boolean;
    units: string;
}

export class GaugeService {
    
    title: string;
    total: number;
    used: number;
    perc: number;
}

export class GaugeModel {

    public title: string;
    public min: number;
    public total: number;   // max
    public used: number;
    public percentage: boolean;
    public perc: number;    // % value
    public units: string;

    constructor(res: GaugeService, configs: GaugeConfigs) {

        // Config file values prevail from in relation to the values of the service
        this.title = configs.title ? configs.title : res.title;
        this.min = configs.min ? configs.min : 0;
        this.total = configs.max ? configs.max : res.total;
        this.percentage = configs.percentage ? configs.percentage : false;
        this.used = res.used;
        this.perc = res.perc;

        if(configs.units) {
            this.units = configs.units;
            this.title = this.title +" - "+ this.units;

        } else if(this.percentage) {
            this.units = "%";
            this.total = 100;
        }
    }

}