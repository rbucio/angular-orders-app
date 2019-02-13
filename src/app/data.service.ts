import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class DataService {

    private orderSource = new BehaviorSubject<Array<any>>([]);
    availableOrders = this.orderSource.asObservable();

    upForDeletion;

    destinations = [
        {
          destinationId: 1,
          destinationName: 'Port of San Francisco'
        },
        {
          destinationId: 2,
          destinationName: 'Port of New York'
        },
        {
          destinationId: 3,
          destinationName: 'Florida Gulf Port'
        },
        {
          destinationId: 4,
          destinationName: 'Shanghai Port'
        }
    ];
      
    freightForwarders = [
        {
          companyId: 1,
          companyName: 'Ocean Wide Logistics',
          contactName: 'Zach Downs'
        },
        {
          companyId: 2,
          companyName: 'Ariba Forwarding',
          contactName: 'Al Dadisho'
        },
        {
          companyId: 3,
          companyName: 'Chopen Logistics',
          contactName: 'Josh Terrill'
        }
    ];

    apiURL = 'http://localhost:3000';

    constructor(private _http: HttpClient) { }

    //
    // API CALLS
    //

    // GET ALL ORDERS
    returnOrdersFromDB(){
        return this._http.get(this.apiURL + '/api/orders')
            .subscribe( (data) => {
                this.updateOrders(data)
            })
    }
    // DELETE ORDER
    deleteOrderFromDB(){
        return this._http.delete(this.apiURL + '/api/orders/' + this.upForDeletion)
    }
    // INSERT ORDER TO DB
    insertOrderToDB(order){
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return this._http.post(this.apiURL + '/api/orders', order, options)
    }

    //
    // GETTERS AND SETTERS
    //
    getDestinations(){
        return this.destinations;
    }
    getFreightForwarders(){
        return this.freightForwarders;
    }
    updateOrders(arr){
        return this.orderSource.next(arr);
    }
    setOrderForDeletion(id){
        this.upForDeletion = id;
    }

}
