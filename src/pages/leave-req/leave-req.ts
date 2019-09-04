import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { LeaveData } from '../../providers/leave-data';
import { ToastController } from 'ionic-angular';
 import { LoadingController } from 'ionic-angular';




@Component({
  selector: 'page-leave-req',
  templateUrl: 'leave-req.html'
})
export class LeaveReqPage {
		reason : string;
		result : string;
	 item: any;
	 startDate : string;
	 endDate : string;
	 kuotaCuti :string;
	 typeLeave : string;
	 public newsData: any;
	 	 	  loading : any;
  constructor(
 
        public loadingController: LoadingController,
	public leaveData: LeaveData,
	public navParams : NavParams,
		public toastCtrl: ToastController
  
   
  ) {}

    ionViewDidLoad() {
		  this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
		   console.log("Masuk Looh");
  this.getRefKeteranganLeave();
  this.getKuotaCuti();
  	this.loading.dismiss();
	//this.getAbsenPegawaiPerDate();
  }
  
  
  onSubmit(){
	  this.insertCuti();
	  console.log("atu ");
  }
  
   insertCuti(){
    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	
	 this.leaveData.insertCuti(this.startDate,this.endDate,this.typeLeave,this.reason,this.navParams.data.username).subscribe((result) => {
		this.result=result.Result;
		//this.newsData=result;
		//console.log("dua ="+this.result.Result);
				 
	})
		
	  this.showToast("Input Leave Request Successfully");
	  this.startDate= "";
	  this.endDate= "";
	  this.reason= "";
	  this.typeLeave= "";
	  this.getKuotaCuti();
	  this.loading.dismiss();
  }
  
  getRefKeteranganLeave(){
  
	
	 this.leaveData.getRefKeteranganLeave().subscribe((result) => {
		this.newsData=result;
		//console.log("dua ="+this.result.Result);
				 
	})
  }
   
  getKuotaCuti(){
  
	
	 this.leaveData.getKuotaCuti(this.navParams.data.username).subscribe((result) => {
		this.kuotaCuti=result.Result;
		console.log("dua ="+result.Result);
				 
	})
  }
  
    showToast(txt : string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }
 
}
