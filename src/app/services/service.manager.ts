import { Injectable }       from '@angular/core';
import { Jsonp, Http }      from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceManager {

    // Observable navItem source
    private _navItemSource = new BehaviorSubject<any>(0);
    
    // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();

    constructor(
        private jsonp: Jsonp,
        private http: Http) {
    }

    /**
     *  Internel Service
     */
    public serviceBehavior(cmd: any) {
        this._navItemSource.next(cmd);
    }

    /**
     * 
     * @param url 
     */
    public callHTTPService(url: string): Observable<any>{
        return  this.http.request( 
                    url 
                )
                .map( res => res.json() )
    }

    /**
     * 
     * @param url 
     */
    public callService(url: string): Observable<any>{
        return  this.jsonp.request( 
                    url 
                ).map( res => res.json() )
    }

    /**
     * 
     * @param url 
     * @param date 
     */
    public callServiceWithDate(url: string, date: string): Observable<any>{
        return  this.jsonp.request( 
                    url.replace("{date}", date)
                ).map( res => res.json() )
    }

    /**
     *  Num só pedido, recebemos os resultados entre a date min e date max.
     * @param datemin 
     * @param datemax 
     */
    public callServiceInRange(url: string, datemin: string, datemax: string): Observable<any>{
        return  this.jsonp.request( 
                    url.replace("{datemin}", datemin).replace("{datemax}", datemax)
                ).map( res => res.json() )
    }

    /**
     * 
     * @param url 
     * @param serverName 
     */
    public callServiceServer(url: string, serverName: string): Observable<Response>  {

        return  this.jsonp.request( 
                    url.replace("{server}", serverName)
                ).map( res => res.json() )
    }
}