import { Component, OnInit } from '@angular/core';
import { TData, TColumn, TDataService, TRow } from 'jli-table';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-ng-scrollbar';

  data: TData;

  columnsConfig: Array<TColumn>;

  constructor(private carService: CarService) {}
  
  ngOnInit() {
    this.columnsConfig = [
      { FieldName:'id', HeaderName:'Id', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'action', HeaderName:'Action', IsVisible: true, IsSortable: false, IsFilterable: false, customSort: (event => {}), Inputs: []},
      { FieldName:'date', HeaderName:'Date', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.DateSort(event)), Inputs: []},
      { FieldName:'vin', HeaderName:'Vin', IsVisible: true, IsSortable: true, IsFilterable: true, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'year', HeaderName:'Year', IsVisible: true, IsSortable: true, IsFilterable: true, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'brand', HeaderName:'Brand', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'color', HeaderName:'Color', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
    ];

    this.data = new TData();
    this.data.Columns = this.columnsConfig;
    this.data.ExpandedRows = {};
    this.data.DataKey = this.columnsConfig[0].FieldName;

    this.data.ExpandedRows = {};
    for(let col of this.data.Columns) {
      this.data.ExpandedRows[col.FieldName] = 0;
    }

    this.carService.getCarsSmall().then(result => {
      TDataService.FormatData(result, this.data, x => this.FormatCars(x));
    });
  }

  public FormatCars(x: TData) {
    x.ExpandedRows = {};
    x.Rows.forEach(function (row) {
        let expandableContent: Array<TRow> = x.Rows.filter(y => y.Data[x.DataKey] >= row.Data[x.DataKey] && y.Data[x.DataKey] < row.Data[x.DataKey]+100 ); 
        row.ExpandableContent = expandableContent;
    });
    x.Rows = x.Rows.filter(y => y.Data[x.DataKey] % 100 == 0);
  }
}
