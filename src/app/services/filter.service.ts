import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export default class Slider {
  lower: Number;
  upper: Number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private originalData = new BehaviorSubject([]);
  currentFulldata =  this.originalData.asObservable();

  private varSelected = new BehaviorSubject(null);
  currentVar = this.varSelected.asObservable();

  private sliderRange = new BehaviorSubject(null);
  currentPosition = this.sliderRange.asObservable();

  updateFilterMap(message: string[]){
    this.messageSource.next(message);
  }

  updateOriginalData(data){
    this.originalData.next(data);
  }

  updateVarSelected(value){
    this.varSelected.next(value);
  }

  sliderRangeChanged(range: Slider){
    this.sliderRange.next(range);
  }

  constructor() { }
}
