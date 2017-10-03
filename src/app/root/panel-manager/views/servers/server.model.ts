interface ServerDetails {
    desctiption: string;
    data: string;
    lastCheck: string;
    nextCheck: string;
}

/**
 *  Propreties from the service call
 */
export interface GenServerService {
    name: string;
    ip: string;
    upTimeInfo: ServerDetails;
    generalInfo: ServerDetails;
}

/**
 *  Class object
 */
export class GeneralServerInfo {

    name : string;
    ip: string;
    upTime: string;
    rta: string;
    lastCheck: string;
    nextCheck: string;

    constructor(res: GenServerService) {
        this.name = res.name;
        this.ip = res.ip;
        this.upTime = res.upTimeInfo.data;
        this.configUptimeDisplay();
        this.rta = res.generalInfo.data;
        this.lastCheck = res.generalInfo.lastCheck;
        this.nextCheck = res.generalInfo.nextCheck;
    }

    private configUptimeDisplay() {

        let info = this.upTime.split(" - ")[1].replace("day", "dias")
                    .replace("hour", "horas").replace("minute", "minuto").split(" ");
                    
        this.upTime = info[0] +" "+ info[1] +" e "+ info[2]+":"+info[4] +" Horas";
    }

    public getRTA(): number {
        if(this.rta.includes("RTA"))
            return Number(this.rta.split(", ")[1].split(" ")[2]);
        else
            return 0
    }
}