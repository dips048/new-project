import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-property-loan-grid',
  templateUrl: './property-loan-grid.component.html',
})
export class PropertyLoanGridComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  @Input() rowData: Array<any> | null;
  @Output() filterChange = new EventEmitter();

  columnDefs = [
    { field: 'Loanid', filter: 'agNumberColumnFilter' },
    { field: 'LoanAmount', filter: 'agNumberColumnFilter',hide: true  },
    { field: 'IntrestRate', filter: 'agNumberColumnFilter', hide: true },
    { field: 'DueDate',
      filter: 'agDateColumnFilter',
      hide: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: any) =>  {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      field: 'NoteDate',
      filter: 'agDateColumnFilter',
      hide: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: any) =>  {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: 'Property Details',
      children: [
        { field: 'name', filter: 'agTextColumnFilter', columnGroupShow: 'oepn'},
        { field: 'city', filter: 'agTextColumnFilter', columnGroupShow: 'closed'},
        { field: 'yearBuilt', filter: 'agNumberColumnFilter', columnGroupShow: 'closed'},
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * set the filter value of a grid
   * @param value
   */
  setFilterValue(value: any) {
    this.myGrid.api.setFilterModel(value);
  }
}
