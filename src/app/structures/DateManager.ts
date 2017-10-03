import { 
    format, addDays, subDays, 
    getDaysInMonth, subMonths, lastDayOfMonth,
    differenceInHours } from 'date-fns';

const DATE_FORMAT: string = "YYYY-MM-DD"

export class DateManager {

    private date: Date;
    private weekDays = [
        "Domingo",  "Segunda",  "Terça",
        "Quarta",   "Quinta",   "Sexta",    "Sabado"
    ];
    private monthArr = [
        "Janeiro",	"Fevereiro",	"Março",		"Abril",
        "Maio",     "Junho", 			"Julho",    "Agosto",
        "Setembro", "Outubro", 		"Novembro", "Dezembro"
    ];

    constructor(date: Date) {
        this.date = date;
    }

    public getDay(): number {
        return this.date.getDate();
    }

    public getyear(): number {
        return this.date.getUTCFullYear();
    }

    public format(): string {
        return format(this.date, DATE_FORMAT);
    }

    public getWeekDay() {
        return this.weekDays[this.date.getDay()];
    }

    public setPrevDay() {
        this.date = subDays(this.date, 1);
    }

    public setPrevMonth() {
        this.date = subMonths(this.date, 1);
    }

    public setLastDayOfMonth() {
        this.date = lastDayOfMonth(this.date);
    }

    public getNameMonth() {
        return this.monthArr[this.date.getMonth()];
    }

    /**
     *  Retrun hours
     * @param serviceDate 
     */
    public diffBetweenDates(serviceDate): number {
        return differenceInHours(this.date, serviceDate);
    }

    public clone() {
        return new DateManager(new Date(this.date));
    }
}