import { DateManager } from 'app/structures/DateManager';

interface TableConfig {

  title?: string;
  serviceURL: string;
  serviceInterval: number;
  footer?: string;
  dateConfig?: DateConfig;
}

export class TableDataInter {
  colName: string;
  colValues: Array<any>;
}

interface DateConfig {
  type: string;
  value: number;
}

export class Table {

  public title: string;
  public serviceURL: string;
  public serviceInterval: number;
  public footer: string;
  public dateConfig: DateConfig;
  public tableData: TableDataInter[];

  private serviceTemp: string;    // usado como modelo para o dateConfig
  

  constructor(elem: TableConfig) {
    this.title = elem.title ? elem.title : "";
    this.footer = elem.footer ? elem.footer : "";
    this.serviceInterval = elem.serviceInterval;
    this.dateConfig = elem.dateConfig ? elem.dateConfig : undefined;
    this.serviceTemp = elem.serviceURL;
    this.serviceURL = elem.serviceURL;
  }

  public setData(data: TableDataInter[]) {
    this.tableData = data;
  }

  public needToConfigUrl(): boolean {
    return this.dateConfig != undefined;
  }

  public configUrl() {
    
    let now = new DateManager(new Date());

    let datemax =  now.clone();

    for(let i=0; i < this.dateConfig.value; i++){
      // move days, month or years
      if(this.dateConfig.type == "byDay") {
        now.setPrevDay();

      } else if (this.dateConfig.type == "byMonth") {
        now.setPrevMonth();
        now.setLastDayOfMonth();
      
      } else if (this.dateConfig.type == "byYears") {
        now.setPrevyear();
        now.setLastDayOfYear();
      }
    }

    this.serviceURL = this.serviceTemp
        .replace("{datemin}", now.format())
        .replace("{datemax}", datemax.format());

    this.title = this.title
        .replace("{datemin}", now.format())
        .replace("{datemax}", datemax.format());
  }
}