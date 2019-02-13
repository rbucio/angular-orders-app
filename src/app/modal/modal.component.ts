import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    minDate: any;
    destinationOptions: any;
    freightOptions: any;
    form: any;
    display = 'display';
    order: any = {
        poNumber: '',
        destination: {},
        shipByDate: '',
        freightForwarder: {}
    };

    constructor(
        private dataService: DataService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.getFormOptions();
        this.createForm();
        this.getMinDate();
    }

    //
    //  HANDLE FORM ORDER SUMIT
    //
    addOrder(){
        // GET DESTINATION AND FREIGHT OBJESTS INDEX
        let destIndex = this.form.controls.oDestination.value;
        let freightIndex = this.form.controls.oFreight.value;
        // SET VALUES FOR ORDER OBJECT
        this.order.poNumber = this.form.controls.oPONumber.value;
        this.order.destination = this.getDestination(destIndex);
        this.order.shipByDate = this.form.controls.oDate.value;
        this.order.freightForwarder = this.getFreight(freightIndex);
        // ADD ORDER TO DB
        this.dataService.insertOrderToDB(this.order)
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

    //
    //  RETURN OPTIONS FROM SERVICE TO USE ON FORM
    //
    getFormOptions(){
        this.destinationOptions = this.dataService.getDestinations();
        this.freightOptions = this.dataService.getFreightForwarders();
    }

    getDestination(index){
        return this.destinationOptions[index];
    }

    getFreight(index){
        return this.freightOptions[index];
    }

    //
    // BUILD AND RESET FORM
    //
    createForm(){ 
        this.form = new FormGroup({
            oDestination: new FormControl(0,[Validators.required]),
            oFreight: new FormControl(0,[Validators.required]),
            oDate: new FormControl('',[Validators.required]),
            oPONumber: new FormControl('',[Validators.required])
        })
    }

    resetForm(){ 
        this.form.reset({
            oDestination: 0,
            oFreight: 0,
            oDate: '',
            oPONumber: ''
        });
    }

    // 
    // DISPLAY SEVER RESPONSE MESSAGE TO CLIENT
    //
    toastrSuccess(message){
        this.toastr.success(message, 'Message');
    }
    toastrError(message){
        this.toastr.error(message, 'Error');
    }

    //
    // GET TODAY'S DATE
    //
    getMinDate(){
        let year: any = new Date().getFullYear();
        let month: any = new Date().getMonth() + 1;
        let day: any = new Date().getDate();

        if(month < 10) {
            month = '0' + month.toString();
        } else {
            month = month.toString();
        }

        if (day < 10) {
            day = '0' + day.toString();
        } else {
            day = day.toString();
        }

        this.minDate = year.toString() + '-' + month + '-' + day;
    }
}
