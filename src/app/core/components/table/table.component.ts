import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-boots',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() records: any[] = [];
  @Input() recordsMostrar: any[] = [];
  @Input() collectionSize: number;
  @Input() render: boolean;
  @Input() servicio: boolean;
  @Input() buttonsAction: { action: any, matTooltip: any }[] = [];
  @Output()
  public tableEvents = new EventEmitter<any>();
  @Output()
  public onSort = new EventEmitter<any>();
  @Output()
  public buttonsEvents = new EventEmitter<any>();
  @Output()
  public onChangeSelectTable = new EventEmitter<any>();
  @Output()
  public onChangeCheckboxSeleccionados = new EventEmitter<any>();

  @Input() checkboxSeleccionados: any[] = [];

  numeroPagina = 1;
  resultadosPorPagina = 10;
  recordMostrarDesde = 0;
  recordMostrarHasta = 0;
  paginasTotales = 0;

  excel = faFileExcel;
  arrowUp = faArrowUp;
  arrowDown = faArrowDown;
  arrowsUpDown = faArrowsUpDown;
  eye = faEye;

  constructor() {
    this.collectionSize = 0;
    this.render = false;
    this.servicio = false;
  }

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    if (
      (this.records !== undefined &&
        this.recordsMostrar.length === 0 &&
        this.records.length > this.resultadosPorPagina) ||
      (this.records !== undefined &&
        !this.servicio &&
        this.recordsMostrar.length + this.resultadosPorPagina !==
          this.records.length)
    ) {
      this.recordsMostrarEvento();
    } else if (
      this.records !== undefined &&
      this.records.length <= this.resultadosPorPagina
    ) {
      this.recordsMostrar = this.records;
    }

    this.recordMostrarDesde =
      this.numeroPagina * this.resultadosPorPagina - this.resultadosPorPagina;
    this.recordMostrarHasta =
      this.recordMostrarDesde + this.recordsMostrar.length;
    this.paginasTotales = Math.ceil(
      this.collectionSize / this.resultadosPorPagina
    );
  }

  updateListing(evento: any): void {
    this.numeroPagina = evento.pageNum;
    this.resultadosPorPagina = evento.limit;
    this.recordsMostrar = [];

    if (!this.servicio) {
      this.recordsMostrarEvento();
    } else {
      this.tableEvents.emit(evento);
    }
  }

  recordsMostrarEvento(): void {
    this.recordsMostrar = [];
    for (
      let i = (this.numeroPagina - 1) * this.resultadosPorPagina;
      i < this.resultadosPorPagina * this.numeroPagina &&
      i < this.records.length;
      i++
    ) {
      this.recordsMostrar.push(this.records[i]);
    }
  }

  sort(evento: any): void {
    if (evento.isOrdenable) {
      evento.numeroPagina = this.numeroPagina;
      evento.resultadosPorPagina = this.resultadosPorPagina;
      this.onSort.emit(evento);
    }
  }

  buttonEvent(index: any, evento: any, action: any): void {
    const rowAction: any[] = [];
    index =
      !this.servicio && action.indexOf('delete') > -1
        ? (this.numeroPagina - 1) * this.resultadosPorPagina + index
        : index;
    rowAction.push(index);
    rowAction.push(evento);
    rowAction.push(action);
    this.buttonsEvents.emit(rowAction);
  }

  onChangeSelect(event: any, fila: number): void {
    const selectChange = [];
    selectChange.push(event.target.value);
    selectChange.push(fila);
    this.onChangeSelectTable.emit(selectChange);
  }

  onChangeChecked(fila: number): void {
    if (this.records[fila][1].checked) {
      this.columns[1].value.checked = false;
      this.checkboxSeleccionados.splice(
        this.checkboxSeleccionados.indexOf(fila),
        1
      );
    } else {
      this.checkboxSeleccionados.push(fila);
    }

    this.records[fila][1].checked = !this.records[fila][1].checked;

    this.onChangeCheckboxSeleccionados.emit(this.checkboxSeleccionados);
  }

  onChangeHeadChecked(): void {
    this.columns[1].value.checked = !this.columns[1].value.checked;

    this.checkboxSeleccionados = [];

    const resultados =
      this.records.length < this.resultadosPorPagina
        ? this.records.length
        : this.resultadosPorPagina;

    if (this.columns[1].value.checked) {
      for (let i = 0; i < resultados; i++) {
        this.checkboxSeleccionados.push(i);
      }
    }

    for (let i = 0; i < resultados; i++) {
      this.records[i][1].checked = this.columns[1].value.checked;
    }

    this.onChangeCheckboxSeleccionados.emit(this.checkboxSeleccionados);
  }
}
