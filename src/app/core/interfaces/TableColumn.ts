export interface TableColumn {
    width: string;
    value: string;
    windowSize: number;
    isPrincipal: boolean;
    isOrdenable: boolean;
    isFiltrable: boolean;
    order: string;
    busqueda: string;
    isHidden: boolean;
    orderName: string;
    action?: string;
}
