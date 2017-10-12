export interface TableModelInter{
  tableTitle?: string;
  tableData: TableDataInter[];
  tableFooter?: string; 
}

export interface TableDataInter {
  header: string;
  data: Array<any>;
}

export class TableData implements TableDataInter {
  
  public header: string;
  public data: Array<any>;

  constructor(
    header: string, data: Array<any>
  ){
    this.header = header;
    this.data = data;
  }
}

export class TableModel implements TableModelInter {

  tableTitle?: string;
  tableData: TableDataInter[];
  tableFooter?: string;

  constructor(data: TableDataInter[]){
    this.tableData = data;
  }
}

interface TableConfig {
  title?: string;
  serviceURL: string;
  serviceInterval: number;
  footer?: string;
}

class Table {

  constructor() {}
}