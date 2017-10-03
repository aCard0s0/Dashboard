import { JsonProperty } from 'json-typescript-mapper';

const BttClass = {
  enable: "btn btn-success",
  disable: "btn btn-outline btn-success",
  
}

interface MenuJson {

  itens: Array<MenuItem>;
}

interface MenuItemView {

  name: string;
  displayTime: number;
  view: any;
  bttclass: string;
}

export class MenuItem implements MenuItemView {

  name: string;
  displayTime: number;
  link: string;
  view: any;
  bttclass: string;
  clicked: boolean;

  constructor(item :MenuItem) {
    this.name = item.name;
    this.displayTime = item.displayTime;
    this.view = item.view;
    this.bttclass = BttClass.disable;
    this.clicked = false;
  }

  setEnable(): void {
    this.bttclass = BttClass.enable;
  }

  setDisable(): void {
    this.bttclass = BttClass.disable;
  }

  isCliked(): number {
    return this.clicked ? this.displayTime + 3000 : this.displayTime;
  }
}