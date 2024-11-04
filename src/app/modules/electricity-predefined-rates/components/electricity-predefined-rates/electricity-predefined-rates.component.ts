import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/core/interfaces/TableColumn';
import { HEADERS, TableService } from '../../services/table.service';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
import { predefinedRatesApiService } from '../../services/api.service';
import { IGetElectricityPredefinedRates } from '../../interfaces/get-electricity-predefined-rates';
import { ElectricityPredefinedRatesResultDataTable } from '../../interfaces/electricity-predefined-rates-result-data-table';

@Component({
  selector: 'app-electricity-predefined-rates',
  templateUrl: './electricity-predefined-rates.component.html',
  styleUrls: ['./electricity-predefined-rates.component.scss']
})
export class ElectricityPredefinedRatesComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  
  // Table properties
  columns: TableColumn[];
  records: any[] = [];
  collectionSize: number;
  renderTable: boolean;
  buttonsAction = [
    {
      action: 'detalle',
      subMenu: [],
      matTooltip: 'Detail',
    },
  ];
  
  constructor(public tableService: TableService, 
              private excelService: ExcelService,
              private apiService: predefinedRatesApiService,
              private modalService: NgbModal) {
    this.columns = HEADERS.tableHeader;
    // Show table
    this.renderTable = false;
    this.tableService.pageNumber = 1;
    this.tableService.pageResults = 10;
    this.subscriptions = [];
    this.collectionSize = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getPredefinedRates();
  }

  private getPredefinedRates(): void {
    this.tableService.results = [];
    this.subscriptions.push(
      this.apiService.getPredefinedRates().subscribe((predefinedRates: IGetElectricityPredefinedRates[]) => {
        this.apiService.predefinedRates = predefinedRates;
        for (const element of predefinedRates) {
          const result: ElectricityPredefinedRatesResultDataTable = {
            rateId: element.id,
            rateName: element.name,
            rate: element.rate,
            productType: element.type,
            singlePrice: element.singlePrice,
            greenPower: element.greenPower
          };    
          this.tableService.results.push(result);
        }

        if (this.tableService.results.length !== 0) {
          this.renderResultsToTable();
        } else {
          this.renderTable = false;
        }
      })
    );
  }

  private renderResultsToTable(): void {
    this.records = [];

    for (const element of this.tableService.results) {
      const record = [];
      record.push(element.rateId);
      record.push(element.rateName);
      record.push(element.rate);
      record.push(element.productType);
      record.push(element.singlePrice);
      record.push(element.greenPower);
      
      this.records.push(record);
    }

    this.collectionSize = this.tableService.totalRecords;
    this.renderTable = true;
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
        const currentRateId = evento[1][0];
        console.log(currentRateId)        
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
    modalRef.closed.subscribe(() => {
      this.getPredefinedRates();
    })
  }

  public handleButtonExportExcelFileClick(): void {
    this.excelService.exportAsExcelFile(
      this.tableService.results,
      'Data table results'
    );
  }
}
