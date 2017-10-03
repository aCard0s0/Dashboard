import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ServiceURLS }        from 'app/services/service.urls';
import { ServiceManager }     from '../../services/service.manager';
import { Panel }              from '../panel/panel.model';

import { deserialize } from 'json-typescript-mapper';

@Component({
  selector: 'file-reader',
  templateUrl: './file-reader.component.html'
})
export class FileReaderComponent implements OnInit {

  private urls: ServiceURLS;                // service URLs

  @Output("notifier")	notify: EventEmitter<string> = new EventEmitter();

  private topPanels: Array<Panel>;
  private lateralPanels: Array<Panel>;
  
  constructor(
    private http: ServiceManager
  ) {
    this.urls = new ServiceURLS();
  }

  ngOnInit() {
    this.getJsonFile();
  }

  public getJsonFile() {

    let response;
    this.http.callHTTPService(this.urls.configFile) //this.urls.configFile
      .subscribe(
        res => {  // success
          //console.log(res);
          response = res;
        },
        err => {  // fail
          //console.log(err)
        },
        () => {   // finally on success
          this.topPanels = eval(response.topPanel);
          for(let i=0; i < this.topPanels.length; i++) {
            this.topPanels[i] = deserialize(Panel, this.topPanels[i]);
          }
          this.lateralPanels = eval(response.lateralPanel);
          for(let i=0; i < this.lateralPanels.length; i++) {
            this.lateralPanels[i] = deserialize(Panel, this.lateralPanels[i]);
          }
          this.notify.emit(); // Loading file over, ready to use
        }
      )
  }

  public getTopPanels() {
    return this.topPanels;
  }

  public getLateralPanels() {
    return this.lateralPanels;
  }
}
