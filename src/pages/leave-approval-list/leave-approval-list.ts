import { Component } from '@angular/core';
import { LeaveApprovalPage } from '../leave-approval/leave-approval';
 import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { AttendentData } from '../../providers/attendent-data';
import { LeaveData } from '../../providers/leave-data';



@Component({
  selector: 'page-leave-approval-list',
  templateUrl: 'leave-approval-list.html'
})
export class LeaveApprovalListPage {
 
	 item: any;
	 bulan : string;
	 tahun : string;
	 public newsData: any;
  constructor(
 
        public navCtrl: NavController,
	public attendentData: AttendentData,
		public leaveData: LeaveData,
	public navParams : NavParams
  
   
  ) {}
ionViewWillEnter() {
	this.getPendingApprovalLeave() ;
}

       ionViewDidLoad() {
		   console.log("Masuk Looh");
   this.getPendingApprovalLeave() ;
	//this.getAbsenPegawaiPerDate();
  }
  
  
  goToLeaveApproval(id : string){
	   this.navCtrl.push(LeaveApprovalPage,{ id: id });
  }
  
   getPendingApprovalLeave(){
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
	
	 this.leaveData.GetPendingApprovalLeave(this.navParams.data.username).subscribe((result) => {
		this.newsData=result;
		console.log("dua ="+this.newsData);
				 
	})
  }
  
  
 
}
