import { JsonProperty } from 'json-typescript-mapper';
import { Threshold } from './threshold.model';
import { FontIcon } from "../panel-manager/views/shared/font/font.model";
import { DBSummary } from '../panel-manager/views/db/db.model';

interface HttpInfo {
    code: number;
    text: string;
}

export class PanelSummary {

    @JsonProperty('serviceUrl')
    public serviceUrl: string;
    @JsonProperty('display')
    public display: string;
    @JsonProperty('subdisplay')
    public subdisplay: string;

    constructor() {
        this.serviceUrl = undefined;
        this.display = undefined;
        this.subdisplay = undefined;
    }
}

export class Panel {

    @JsonProperty('name')
    public name:        string;
    @JsonProperty('panelId')
    public panelId:     number;
    @JsonProperty({clazz: FontIcon, name: 'fontAwsomeIcon'})
    public fontAwsomeIcon:      FontIcon;
    @JsonProperty('imgSrc')
    public imgSrc:      string;
    @JsonProperty({clazz: PanelSummary, name: 'summary'})
    public summary:      PanelSummary[];
    @JsonProperty('summaryIntreval')
    public summaryIntreval: number;
    @JsonProperty({clazz: Threshold, name: 'threshold'})
    public threshold:   Threshold;
    @JsonProperty('views')          // {clazz: Views[], name: 'Address'}
    public views:       any[];     // Views list for this panel.
    @JsonProperty('defaultColor')
    public panelColor:  string;

    public underlineColor:  string;     // if active, this represent the underline color
    public active:          boolean;    // if has or not underline, is underline when
    public clicked:         boolean;    // if set add more time to display time
    
    constructor(){
        this.name = undefined;
        this.panelId = undefined;
        this.fontAwsomeIcon = undefined;
        this.imgSrc = undefined;
        this.summary = undefined;
        this.summaryIntreval = undefined;
        this.threshold = undefined;
        this.views = undefined;
        this.panelColor = undefined;
        this.underlineColor = undefined;
        this.active = undefined;
        this.clicked = undefined;
    } 

    private defineUnderline() {

        if(this.panelColor.includes("yellow"))
            this.underlineColor = "underline-panel-yellow";

        else if(this.panelColor.includes("red"))
            this.underlineColor = "underline-panel-red";

        else if(this.panelColor.includes("green"))
            this.underlineColor = "underline-panel-green";

        else if(this.panelColor.includes("primary"))
            this.underlineColor = "underline-panel-blue";
    }

    // Panel display
    public setActive(): void    { 
        this.active = true;
        this.defineUnderline();
    }

    public setInactive(): void  { this.active = false;  }

    // Lateral Panel
    public setHardwarePanel(values: any[]) {
        
        if( !values.includes(undefined) && values.length == this.summary.length) {

            // set texts
            this.summary.forEach( (elem, index) => {
                elem.subdisplay = elem.subdisplay.replace("{value}", values[index]);
            })

            // set color
            let flagErro: boolean = false;
            values.forEach( (elem, index) => {
                if(elem == "Erro"){
                    this.panelColor = this.threshold.getRedPanel();
                    flagErro = true;
                } else {
                    values[index] = Number(elem.replace('%', ''));
                }
            });

            // Note that if contains Erro don't get to this part of the function
            if(!flagErro) {
                let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
                values.forEach( elem => {
                    if (elem < min)      min = elem;
                    else if (elem > max) max = elem;
                });
                this.panelColor = this.threshold.setColorForHardwarePanel(max);
            }

            this.defineUnderline();
        }
    }

    // Set Top Panel Error, when service fail
    public setSotwarePanelError() {
        // color
        this.panelColor = this.threshold.getRedPanel();
        // text
        this.summary.forEach( (elem) => {
            elem.display = this.threshold.getErrorDisplay();
        });

        this.defineUnderline();
    }

    /**
     *  Set Top Panel (Servidores)
     * Only needs one unreachable ser to panel sets to red.
     * @param codes data structer that contains the ping code from the service
     */
    public setServerPanel(codes: number[]) {
        
        if( !codes.includes(undefined) && codes.length == this.summary.length) {
            // Color
            this.panelColor = this.threshold.setColorForServerPanel(codes);
            // Text
            this.summary.forEach( (elem, index) => {
                let result = this.threshold.setTextForSoftwarePanel(codes[index]);
                elem.display = elem.display.replace("{state}", result);
                elem.subdisplay = elem.subdisplay.replace("{state}", result);
            });

            this.defineUnderline();
        }

    }

    /** 
     *  Set Top Panel (WebSites)
     * @param code 
     */
    public setSoftwarePanel(code: number){
        // color
        this.panelColor = this.threshold.setColorForSoftwarePanel(code);
        // text
        this.summary.forEach( (elem) => {
            let resultStr = this.threshold.setTextForSoftwarePanel(code)
            elem.display = elem.display.replace("{state}", resultStr);
            elem.subdisplay = elem.subdisplay.replace("{state}", resultStr);
        });

        this.defineUnderline();
    }


    public setTestsPanel(testSummary: any[]) {
        
        if( !testSummary.includes(undefined) && testSummary.length == this.summary.length) {
            
            // set texts
            this.summary.forEach( (elem, index) => {
                elem.display = elem.display
                    .replace("{idBuild}", testSummary[index].idBuild)
                    .replace("{value}", testSummary[index].sucessPerc.toString())
                    .replace("{num}", testSummary[index].version);
                elem.subdisplay = elem.subdisplay
                    .replace("{idBuild}", testSummary[index].idBuild)
                    .replace("{value}", testSummary[index].sucessPerc.toString())
                    .replace("{num}", testSummary[index].version);
            });

            // set Color, test frist who is the most significant value
            let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
            testSummary.forEach( elem => {
                if (elem.sucessPerc < min)      min = elem.sucessPerc;
                if (elem.sucessPerc > max)      max = elem.sucessPerc;
            });
            this.panelColor = this.threshold.setColorForTestesPanel(min); // logica invertida dos hardwares panels
            
            this.defineUnderline();
        }
    }

    /** REPENSAR E USAR A ESTRATEGIA DO VALOR MAIS SIGNIFICATIVO
     *  Set Top Panel (Base de Dados)
     */
    public setDBPanel(dbSummary: DBSummary[]) {
        
        if( !dbSummary.includes(undefined) && dbSummary.length == this.summary.length) {
            
            let result = this.threshold.setColorForDBPanel(dbSummary);
            // Color
            this.panelColor = result.color;
            // Text
            this.summary.forEach( (elem, index) => {
                elem.display = elem.display.replace("{state}", result.text);
                elem.subdisplay = elem.subdisplay.replace("{state}", result.text);
            });

            this.defineUnderline();
        }
    }

    // TODO
    public setProcessPanel(procPend: number[]) {

        if( !procPend.includes(undefined) && procPend.length == this.summary.length) {

            // set text
            this.summary.forEach( (elem, i) => {
                elem.display = elem.display.replace("{num}", procPend[i].toString());
                elem.subdisplay = elem.subdisplay.replace("{num}", procPend[i].toString());
            });

            // set Color, test frist who is the most significant value
            let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
            let pos;
            procPend.forEach( (elem, index) => {
                if (elem < min) {
                    min = elem;
                }
                if (elem > max) {
                    max = elem;
                    pos = index;
                }
            });
            this.panelColor = this.threshold.setColorForProcPanel(max, pos);
            
            this.defineUnderline();
        }
    }
    
    public setUserPanel() {
        this.panelColor = "panel panel-primary"
        this.defineUnderline();
    }
}

/* // Panel Colors
    public setBluePanel():   void   { this.panelColor = ColorPanel.Blue;   }
    public setGreenPanel():  void   { this.panelColor = ColorPanel.Green;  }
    public setYellowPanel(): void   { this.panelColor = ColorPanel.Yellow; }
    public setRedPanel():    void   { this.panelColor = ColorPanel.Red;    } */