import { FontIcon } from "../font/font.model";

export class WebStatus {

    public name: string;
    public serviceURL: string;
    public onIcon: FontIcon;
    public offIcon: FontIcon;
    private state: boolean;         // false offline, true online

    constructor(elem: any) {
        this.name = elem.name;
        this.serviceURL = elem.serviceURL;
        this.onIcon = elem.onIcon;
        this.offIcon = elem.offIcon;
    }

    public setState(res: any) {
        res.code == 200 ? this.state = true : this.state = false;
    }

    public getFont(): FontIcon {
        return this.state ? this.onIcon : this.offIcon;
    }
}