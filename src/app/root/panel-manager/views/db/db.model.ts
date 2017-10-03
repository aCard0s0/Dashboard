export interface DBSummary {

    completo: DBModel;
    transaction: DBModel;

    //constructor() {}
}

export interface DBModel {
    DbName: string;
    Date: string;
    BackupType: string;
    BackupSize: string;

    //constructor() {}
}