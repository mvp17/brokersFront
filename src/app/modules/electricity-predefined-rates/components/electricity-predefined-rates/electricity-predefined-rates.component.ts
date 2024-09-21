import { Component } from '@angular/core';
import { TableColumn } from 'src/app/core/interfaces/TableColumn';
import { HEADERS, TableService } from '../../services/table.service';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { DetailDataService } from '../../services/detail-data.service';

@Component({
  selector: 'app-electricity-predefined-rates',
  templateUrl: './electricity-predefined-rates.component.html',
  styleUrls: ['./electricity-predefined-rates.component.scss']
})
export class ElectricityPredefinedRatesComponent {

  // Table properties
  columns: TableColumn[];
  records: any[] = [];
  collectionSize: number;
  busquedaGestionTabla: boolean;
  buttonsAction = [
    {
      action: 'detalle',
      subMenu: [],
      matTooltip: 'Detalle',
    },
  ];
  
  constructor(public tableService: TableService, 
              private excelService: ExcelService,
              private detailDataService: DetailDataService,
              private modalService: NgbModal) {
    this.columns = HEADERS.tableHeader;
    // Show table
    this.busquedaGestionTabla = true;
    this.tableService.pageNumber = 1;
    this.tableService.pageResults = 10;
    this.collectionSize = 1 //this.tableService.totalRecords;
    this.tableService.results = [
      {
        rate: 'Rate 2',
        productType: 'Fixed',
        singlePrice: true,
        greenPower: false
      }
    ]

    for (const element of this.tableService.results) {
      const row = [];
      row.push(element.rate);
      row.push(element.productType);
      row.push(element.singlePrice);
      row.push(element.greenPower);

      this.records.push(row)
    }
  }

  updateListing(evento: any): void {
    this.tableService.pageNumber = evento._pageNum;
    this.tableService.pageResults = evento._limit;
  }
  onSort(evento: TableColumn): void { }

  buttonsEvents(evento: any): void {
    switch (evento[2]) {
      case 'excel':
        this.handleButtonExportExcelFileClick();
        break;
      case 'detalle':
        this.detailDataService.rate = evento[1][0];
        this.detailDataService.productType = evento[1][1];
        this.detailDataService.singlePrice = evento[1][2];
        this.detailDataService.greenPower = evento[1][3];
        
        const modalRef = this.modalService.open(ModalComponent, { size: 'xl'});
        modalRef.componentInstance.readCurrentRateOrigin = true;
        
        break;
      default:
        break;
    }
  }

  showCreateNewPredefinedRate(): void {
    const modalRef = this.modalService.open(ModalComponent, { size: 'xl'});
    modalRef.componentInstance.createNewRateOrigin = true;
  }

  public handleButtonExportExcelFileClick(): void {
    this.excelService.exportAsExcelFile(
      this.tableService.results,
      'Data table results'
    );
  }
}
