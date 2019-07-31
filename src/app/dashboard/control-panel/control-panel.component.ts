import { Component, OnInit } from '@angular/core';
import {FilterService} from "../../services/filter.service";
import Dictionary from "../../services/Dictionary";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  valueSelected: Dictionary[];

  constructor(public fs: FilterService) { }

  ngOnInit() {
    this.fs.currentVar.subscribe(value => this.valueSelected = value);
  }

}
