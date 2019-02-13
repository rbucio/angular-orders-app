import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
    selector: 'OrderList',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

    orderList: any;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.availableOrders
            .subscribe( (data) => {
                this.orderList = data;
            }
        );
        this.dataService.returnOrdersFromDB();
    }

    setForDeletion(id){
        this.dataService.setOrderForDeletion(id);
    }

}
