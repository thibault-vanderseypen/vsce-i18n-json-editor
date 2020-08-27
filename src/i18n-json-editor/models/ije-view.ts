export interface IJEView {
    type: IJEViewType;
    selectionId?: number;
}
export enum IJEViewType {
    TABLE = 'table',
    LIST = 'list'
}