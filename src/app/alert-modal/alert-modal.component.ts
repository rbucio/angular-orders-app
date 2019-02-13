import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'alertModal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

    constructor(
        private dataService: DataService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        
    }

    deleteOrder(){
        this.dataService.deleteOrderFromDB()
            .subscribe(
                (success) => { 
                    this.toastrSuccess(success[0].message);
                    this.dataService.returnOrdersFromDB();
                },
                (err) => { 
                    this.toastrError(err); 
                }
            )
    }

    toastrSuccess(message){
        this.toastr.success(message, 'Message');
    }
    toastrError(message){
        this.toastr.error(message, 'Error');
    }

}
