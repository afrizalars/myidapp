import { Component } from '@angular/core';

// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NavController } from 'ionic-angular';

import { MeetingAttendanceViewPage } from '../meeting-attendance-view/meeting-attendance-view';

import { UserData } from '../../providers/user-data';
import { ToastController } from 'ionic-angular';
import { MeetingAttendanceData } from '../../providers/meeting-attendance-data';
 import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-meeting-attendance-list',
  templateUrl: 'meeting-attendance-list.html'
})
export class MeetingAttendanceListPage {
   loading: any;
	username : string;
	Datas : any;
  constructor(
 //  private barcodeScanner: BarcodeScanner,
    public loadingController: LoadingController,
  public meetingAttendanceData: MeetingAttendanceData,
      public navCtrl: NavController,
  public userData: UserData,
  	public toastCtrl: ToastController
   
   
  
   
  ) {}
    showToast(txt : string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

     ionViewDidEnter() {
	 
  // this.goToScanQR();
   }
       ionViewDidLoad() {
		
		  
   this.getUsername() ;
  
	//this.getAbsenPegawaiPerDate();
  }

  

  goToMeetingAttendanceView(id : string){
	   this.navCtrl.push(MeetingAttendanceViewPage,{ id: id });
  }
	   GetAttendanceMeetingList(){
		      this.loading = this.loadingController.create({ content: "Please wait..." });
     this.loading.present();
	
	
  this.meetingAttendanceData.GetAttendanceMeetingList(this.username).subscribe((data: any) => {
	this.Datas=data;
    });
		  this.loading.dismiss();
  }
  
   
   getUsername() {
	    console.log("Get Username ");
    this.userData.getUsername().then((username) => {
       this.username = username;
	  this.GetAttendanceMeetingList();
	  console.log("Get Username :"+this.username);
    });
  }
  
 
}
