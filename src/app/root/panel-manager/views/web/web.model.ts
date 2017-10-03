export interface HttpInfosService {
    code: number;
    text: string;
}

export class HttpInfo {
    code: number;
    text: string;

    constructor(res: HttpInfosService) {
        this.code = res.code;
        this.text = res.text;
    }
}

export class SoftwareModel {

    public sijStatus: HttpInfo;
    public djeStatus: HttpInfo;
    public oacvStatus: HttpInfo;
    public identityStatus: HttpInfo;
    public iTopStatus: HttpInfo;

    constructor(res: any) {
        this.sijStatus = res.sijStatus;
        this.djeStatus = res.djeStatus;
        this.oacvStatus = res.oacvStatus;
        this.identityStatus = res.identityStatus;
        this.iTopStatus = res.iTopStatus;
    }
}