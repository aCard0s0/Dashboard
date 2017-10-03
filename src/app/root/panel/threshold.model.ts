import { JsonProperty } from 'json-typescript-mapper';
import { DBSummary } from '../panel-manager/views/db/db.model';
import { DateManager } from 'app/structures/DateManager';

const ColorPanel = {
    Blue:   'panel panel-primary',
    Green:  'panel panel-green',
    Yellow: 'panel panel-yellow',
    Red:    'panel panel-red',
    Panel:  'panel panel-'
}

interface HardLimits {
    min: number;
    max: number;
    panelColor: string;
}

interface SoftLimits {
    code: any[];
    panelColor: string;
    text: string;
}

interface DBLimits {
    hours: number;
    panelColor: string;
    text: string;
}

interface Database { // not being used
    completos: DBLimits[];
    transactions: DBLimits[];
}

interface TestsLimits {
    min: number;
    max: number;
    panelColor: string;
}

interface ProcLimits {
    min: number;
    max: any;           // * is possivel
    panelColor: string;
    text: string;
}

interface PanelProc {
    requerimentos: ProcLimits[];
    despachos: ProcLimits[];
    expAutos: ProcLimits[];
}

export class Threshold {

    hardware: HardLimits[];
    software: SoftLimits[];
    database: Database;
    testes: TestsLimits[];
    process: PanelProc;

    constructor() {
        this.hardware = undefined;
        this.database = undefined;
        this.software = undefined;
        this.testes = undefined;
        this.process = undefined;
    }

    public getRedPanel(): string   { return ColorPanel.Red; }
    public getErrorDisplay():string{ return "Erro no serviço"} 

    public setColorForHardwarePanel(value: number): string {

        let color = ColorPanel.Blue;        // default
        this.hardware.forEach( elem => {
            if(value >= elem.min && value <= elem.max){
                color = ColorPanel.Panel + elem.panelColor;
            }
        });
        return color;
    }

    public setColorForSoftwarePanel(value: number): string {

        let color = ColorPanel.Blue;
        let colorFlag = false;
        this.software.forEach( (elem) => {
            if (elem.code.includes(value)) {
                color = ColorPanel.Panel + elem.panelColor;
                colorFlag = true;
            }
        });
        if(!colorFlag) {
            color = ColorPanel.Yellow;
        }
        return color;
    }

    public setTextForSoftwarePanel(value: number): string {
        
        let text = "";
        let textFlag = false;
        this.software.forEach( elem => {
            if (elem.code.includes(value)) {
                text = elem.text;
                textFlag = true;
            }
        });
        if(!textFlag) {
            this.software.forEach( (elem) => {
                if(elem.panelColor == "yellow") {
                    text = elem.text;
                }
            });
        }
        return text;
    }

    public setColorForServerPanel(codes: number[]): string {

        let color = ColorPanel.Blue;
        let redFlag = false;
        codes.forEach( (code) => {
            this.software.forEach( (threshold) => {
                
                if(threshold.code.includes(code) && threshold.panelColor == "red") {
                    redFlag = true;

                } else if(threshold.code.includes(code)) {
                    color = ColorPanel.Panel + threshold.panelColor;
                }
            });
        });
        return redFlag ? ColorPanel.Red : color;
    }

    // rework
    public setColorForDBPanel(dbSummary: DBSummary[]): ThresholdResult {

        let now = new DateManager(new Date());
        let diff;
        let thresholdComp;
        let resultComp: ThresholdResult = new ThresholdResult(ColorPanel.Blue, "");
        let thresholdTrans;
        let resultTrans: ThresholdResult = new ThresholdResult(ColorPanel.Blue, "");

        // completos or transation settings acording with threshold
        for(let i=0; i < dbSummary.length; i++) {
            
            if( (!resultComp.isRed() && !resultTrans.isRed()) ||
                (!resultComp.isRed() && !resultTrans.isYellow()) || 
                (!resultComp.isYellow() && !resultTrans.isRed()) || 
                (!resultComp.isYellow() && !resultTrans.isYellow()) ){

                diff = now.diffBetweenDates(new Date(dbSummary[i].completo.Date));

                // completos    [0]
                thresholdComp = this.database.completos;
                for(let i=0; i < thresholdComp.length; i++) {
                    
                    if(thresholdComp[i].hours[1] == "*") {
                        if( diff > thresholdComp[i].hours[0] ) {
                            resultComp = new ThresholdResult(ColorPanel.Red, thresholdComp[i].text);
                            break;
                        }
                    } else if( diff > thresholdComp[i].hours[0] && diff < thresholdComp[i].hours[1] ) {
                        resultComp = new ThresholdResult(ColorPanel.Panel + thresholdComp[i].panelColor, thresholdComp[i].text);
                        break;
                    }
                }
                // transactions   [1]
                thresholdTrans = this.database.transactions;
                for(let i=0; i < thresholdTrans.length; i++) {

                    if(thresholdTrans[i].hours[1] == "*") {
                        if( diff > thresholdTrans[i].hours[0] ) {
                            resultTrans = new ThresholdResult(ColorPanel.Red, thresholdTrans[i].text);
                            break;
                        }
                    } else if( diff > thresholdTrans[i].hours[0] && diff < thresholdTrans[i].hours[1] ) {
                        resultTrans = new ThresholdResult(ColorPanel.Panel + thresholdTrans[i].panelColor, thresholdTrans[i].text);
                        break;
                    }
                }

            } else {
                break; // stop loop
            }
        }
        // set who got priority, completos or transation settings
        if (resultComp.isRed() || resultTrans.isRed()) {
            return resultComp;
        } else if (resultComp.isYellow() || resultTrans.isYellow()) {
            return resultComp;
        } else if (resultComp.isBlue() || resultTrans.isBlue()) {
            return resultComp;
        } else 
            return resultComp;
    }

    public setColorForTestesPanel(value: number): string {

        let color = ColorPanel.Blue;        // default
        this.testes.forEach( elem => {
            if(value >= elem.min && value <= elem.max){
                color = ColorPanel.Panel + elem.panelColor;
            }
        });
        return color;
    }

    // Rework
    public setColorForProcPanel(value: number, pos:number): string {

        let color = ColorPanel.Blue;        // default

        // 0 => requerimentos
        if (pos == 0) {
            this.process.requerimentos.forEach( 
                elem => {
                    if(value >= elem.min && elem.max == "*"){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                    if(value >= elem.min && value <= elem.max){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                }
            );
        
        // 1 => despachos
        } else if (pos = 1) {
            this.process.despachos.forEach(
                elem => {
                    if(value >= elem.min && elem.max == "*"){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                    if(value >= elem.min && value <= elem.max){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                }
            );
        
        // 2 => expAutos
        } else if (pos = 2) {
            this.process.expAutos.forEach(
                elem => {
                    if(value >= elem.min && elem.max == "*"){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                    if(value >= elem.min && value <= elem.max){
                        color = ColorPanel.Panel + elem.panelColor;
                    }
                }
            );
        }
        return color;
    }
}


class ThresholdResult {

    color: string;
    text: string;

    constructor(color, text){
        this.color = color;
        this.text = text;
    }

    public contains(color: string): boolean {
        return this.color.includes(color);
    }

    public isRed(): boolean {
        return this.color == ColorPanel.Red;
    }

    public isYellow(): boolean {
        return this.color == ColorPanel.Yellow;
    }

    public isGreen(): boolean {
        return this.color == ColorPanel.Green;
    }

    public isBlue(): boolean {
        return this.color == ColorPanel.Blue;
    }
}