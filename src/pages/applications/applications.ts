import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LeavePage } from '../leave/leave';
import { MeetingAttendancePage } from '../meeting-attendance/meeting-attendance';
import { LeaveData } from '../../providers/leave-data';
import { UserData } from '../../providers/user-data';
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
  selector: 'page-applications',
  templateUrl: 'applications.html'
})
export class ApplicationsPage {

countPendingLeaveReq : string;
username : string;
  constructor(
  //  public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
  public userData: UserData,
   public leaveData: LeaveData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  
  ionViewWillEnter() {
	this.getUsername();
}
  ionViewDidLoad() {
 this.getUsername();

  }
openWebpage(url: string) {
 

    // Opening a URL and returning an InAppBrowserObject
   this.inAppBrowser.create(url, '_self', 'zoom=no');

   // Inject scripts, css and more with browser.X
  }
   goToLeaveRequest(){
	   this.navCtrl.push(LeavePage,{ username: this.username });
  }
  
    goToMeetingAttendance(){
		// this.navCtrl.push(LeavePage,{ username: this.username });
	   this.navCtrl.push(MeetingAttendancePage,{ username: this.username });
  }
  
    getCountApprovaLeave(){
  
	  console.log("Get Username :"+this.username);
	 this.leaveData.getCountApprovaLeave(this.username).subscribe((result) => {
		this.countPendingLeaveReq=result.Result;
		//console.log("dua ="+this.result.Result);
				 
	})
  }
   
   getUsername() {
	    console.log("Get Username ");
    this.userData.getUsername().then((username) => {
      this.username = username;
	this.getCountApprovaLeave();
	  console.log("Get Username :"+this.username);
    });
   }
}
