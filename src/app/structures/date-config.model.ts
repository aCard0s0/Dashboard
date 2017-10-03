import { JsonProperty } from 'json-typescript-mapper';

export class DateConfig {

    @JsonProperty('type')
    type:   string;     // byDay, byMonth, byYear
    @JsonProperty('value')
    value:  number;

    constructor() {
        this.type = undefined;
        this.value = undefined;
    }
}