import { Component, OnInit } from '@angular/core';
import {FilterService} from "../../services/filter.service";
import Dictionary from "../../services/Dictionary";
import { NavController } from 'ionic-angular';


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  public rangeObject:any= {lower: 2002, upper: 2015};
  valueSelected: Dictionary[];

  constructor(public fs: FilterService, navCtrl: NavController) { }

  ngOnInit() {
    this.fs.currentVar.subscribe(value => this.valueSelected = value);
  }

}
