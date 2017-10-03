import { Component, OnInit, ViewChild} from '@angular/core';
import { Panel }                  from './panel/panel.model';
import { ServiceURLS }            from 'app/services/service.urls';
import { ServiceManager }         from '../services/service.manager';
import { FileReaderComponent }    from './file-reader/file-reader.component';
import { PanelManagerComponent }  from './panel-manager/panel-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  @ViewChild('reader') 
    reader: FileReaderComponent;

  public  topPanels: Array<Panel>;
  public  lateralPanels: Array<Panel>;
  private panels: Array<Panel>;
  
  public  state: boolean;      // True- Loading, False- Complete

  public  selectedPanel: Panel;        // Panel Selected
	private idPanel: number;        // Active Panel ID

  constructor(
    private http: ServiceManager,
  ) { 
    this.state = true;    // state set to Loading File
    this.idPanel = 0;
  }

  ngOnInit() {
    // Como apanhar ref de um outro objecto qualquer presente no DOM?
  }

  public notifyFileReader() {

    this.topPanels = this.reader.getTopPanels();
    this.lateralPanels = this.reader.getLateralPanels();
    this.panels = this.topPanels.concat(this.lateralPanels); // topPanels + lateralPanels
    
    // only panels with view are selected
    this.panels = this.panels.filter( (value) => {return value.views != undefined || value.views != null });
    this.selectedPanel = this.panels[this.idPanel];
    this.selectedPanel.setActive();
    
    this.state = false;     // state set to Complete 
  }

  /**
   *  This Component gets nofity by the Panel-Manager Component to change the Selected Panel
   *  Sets the frist view's panel in the Panel-Manager Component and call the loop.
   */
  public notifyNextPanel(){

    this.selectedPanel.setInactive();
    this.idPanel = (this.idPanel+1) % this.panels.length;   // next panel
		this.selectedPanel = this.panels[this.idPanel];
    this.selectedPanel.setActive();
    this.selectedPanel.clicked = false;
  }

  /**
   *  When Panel clicked change the selectPanel to it.
   * @param panel 
   */
  public clikedPanel(panel) {

    this.http.serviceBehavior(panel);
    this.idPanel = this.panels.findIndex( obj => obj == panel );
    this.selectedPanel.setInactive();
    this.selectedPanel = this.panels[this.idPanel];
    this.selectedPanel.setActive();
    this.selectedPanel.clicked = true;
  }
}
