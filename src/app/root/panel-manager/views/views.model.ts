export interface View {

    viewType: string;
    displayInterval: number;
}

export interface TableView extends View{

    title:string;
    serviceURL: string;
    serviceInterval: string;
    footer: string;
}