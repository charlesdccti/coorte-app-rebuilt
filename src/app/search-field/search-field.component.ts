import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  myControl = new FormControl();
  valueSelected;
  businesses: any;
  filteredOptions: Observable<string[]>;
  univariadaData;


  constructor(private apis: ApiService, public fs: FilterService) {  }
  
  ngOnInit() {

    this.fs.currentVar.subscribe(value => this.valueSelected = value);

    if (this.valueSelected !== null){
      this.myControl.setValue(this.valueSelected.descricao);
    }
    
    this.apis.getBusinesses().subscribe((data: any[]) => {
      this.businesses = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),map(option => option ? this._filter(option) : this.businesses));
    });
    
  }


  public varSelect(selectedA) {
    this.myControl.setValue(selectedA.descricao);
    this.valueSelected = selectedA.descricao;
    
    this.apis.getUnivariada(selectedA.variavel).subscribe(data => {
      this.fs.updateOriginalData(data); 
    })
    this.fs.updateVarSelected(selectedA);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.businesses.filter(option => option.descricao.toLowerCase().includes(filterValue));
  }

}
