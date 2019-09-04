import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmployeePage } from '../employee/employee';
import { AttendentPage } from '../attendent/attendent';
import { MeetingAttendancePage } from '../meeting-attendance/meeting-attendance';
import { HelpdeskITPage } from '../helpdeskIT/helpdeskIT';
import { LeaveData } from '../../providers/leave-data';
import { UserData } from '../../providers/user-data';
import { ApiData } from '../../providers/api-data';
import {
  // ActionSheet,
  // ActionSheetController,
  // ActionSheetOptions,
  Config,
 // NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';





// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
personalNumber : string;
DataProfile : any;
countPendingLeaveReq : string;
username : string;
  constructor(
  //  public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
  public userData: UserData,
   public leaveData: LeaveData,
   public apiData: ApiData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  

  ngOnInit() {
   
    this.personalNumber = localStorage.getItem("PersonalNumber");
    this.getData();
  }

   goToDataPegawai(){
	   this.navCtrl.push(EmployeePage);
  }
  
    goToHelpdesk(){
		// this.navCtrl.push(LeavePage,{ username: this.username });
	   this.navCtrl.push(HelpdeskITPage,{ username: this.username });
  }
  
    goToAbsensi(){
		// this.navCtrl.push(LeavePage,{ username: this.username });
	  // this.navCtrl.push(AttendentPage,{ username: this.username });
	  this.navCtrl.setRoot(AttendentPage,0);
  }
  
    goToMeetingAttendance(){
   this.navCtrl.push(MeetingAttendancePage,{ username: this.username });
	  // console.log("Get Username :"+this.username);
	 // this.leaveData.getCountApprovaLeave(this.username).subscribe((result) => {
		// this.countPendingLeaveReq=result.Result;
		// //console.log("dua ="+this.result.Result);
				 
	}
  
  getData() {
    this.apiData.getEmployeeProfile(this.personalNumber).subscribe((result) => {
      this.DataProfile = result.hasil;
    });
//    getUsername() {
// 	    console.log("Get Username ");
//     this.userData.getUsername().then((username) => {
//       this.username = username;
// //	this.getCountApprovaLeave();
// 	  console.log("Get Username :"+this.username);
//     });
//    }
}
}
