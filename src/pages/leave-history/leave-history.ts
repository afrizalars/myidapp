import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { AttendentData } from '../../providers/attendent-data';
import { LeaveData } from '../../providers/leave-data';
 import { LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-leave-history',
  templateUrl: 'leave-history.html'
})
export class LeaveHistoryPage {
 
	 item: any;
	 bulan : string;
	 tahun : string;
	 public newsData: any;
	 loading : any;
  constructor(
 
     public loadingController: LoadingController,
	public attendentData: AttendentData,
		public leaveData: LeaveData,
	public navParams : NavParams
  
   
  ) {}

  ionViewWillEnter() {
  
  }
  
  
  
  onSearch(){
	   this.getAbsenPegawaiPerMonth();
	  console.log("atu ");
  }
  
  getAbsenPegawaiPerMonth(){
  // this.attendentData.getAbsenPegawaiPerMonth(this.navParams.data.username,this.bulan,this.tahun).subscribe((data: any) => {
		 // console.log("Satu ");
      // if (
        // data 
      // ) {
        // for (const row of data) {
        
             
                // this.item = row;
                // break;
              
            
          
        // }
      // }
    // });
		 this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	 this.leaveData.GetHistoryLeave(this.navParams.data.username,this.bulan,this.tahun).subscribe((result) => {
		this.newsData=result;
		console.log("dua ="+this.newsData);
				 
	})
		this.loading.dismiss();
  }
  
 
}
