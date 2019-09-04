import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LeaveApprovalListPage } from '../leave-approval-list/leave-approval-list';
import { LeaveReqPage } from '../leave-req/leave-req';
import { LeaveHistoryPage } from '../leave-history/leave-history';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
 
	username : string;
	
  constructor(
 
      public navCtrl: NavController,
  public userData: UserData
   
   
  
   
  ) {}

       ionViewDidLoad() {
		   console.log("Masuk Looh");
   this.getUsername() ;
	//this.getAbsenPegawaiPerDate();
  }
  
  goToInputLeave(){
	   this.navCtrl.push(LeaveReqPage,{ username: this.username });
  }
  
     goToTLeaveHistory(){
	    this.navCtrl.push(LeaveHistoryPage,{ username: this.username });
   }
     goToLeavePendingApproval(){
	    this.navCtrl.push(LeaveApprovalListPage,{ username: this.username });
   }
   getUsername() {
	    console.log("Get Username ");
    this.userData.getUsername().then((username) => {
       this.username = username;
	  // this.getAbsenPegawaiPerDate();
	  console.log("Get Username :"+this.username);
    });
  }
  
 
}
