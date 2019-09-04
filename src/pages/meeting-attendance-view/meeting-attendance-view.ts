import { Component } from '@angular/core';

// import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';





import { UserData } from '../../providers/user-data';
import { MeetingAttendanceData } from '../../providers/meeting-attendance-data';
import { ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-meeting-attendance-view',
  templateUrl: 'meeting-attendance-view.html'
})
export class MeetingAttendanceViewPage {
 isShowCard :number =0 ;
	username : string;
	attd_m_req_ID : string ='';
	itemMeeting: any;
	itemMeetingAttendance: any;
	joined : number ;
	 encodeData: any;
	 scannedData: any;
  constructor(
   private barcodeScanner: BarcodeScanner,

	 private meetingAttendanceData: MeetingAttendanceData,
	public navParams : NavParams,
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
	  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data ' + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }
 encodedText(txt : string) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, txt).then((encodedData) => {
      console.log(txt);
      this.encodeData = encodedData;
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }
  
  
  
       ionViewDidLoad() {
		  this.encodeData = "https://www.FreakyJolly.com";
		   this.getUsername() ;
		
		this.showCard();
		   console.log("Masuk Looh");
 
  

  }

      ionViewDidEnter() {
	//this.showCard();
 
   }

   
   showCard(){
	   
	   this.attd_m_req_ID = this.navParams.data.id;
	 
	 // this.showToast("attr_ID="+this.navParams.data.id); 
	    
	     if(this.attd_m_req_ID == null)
	 {
		     this.isShowCard = 0;
		
		
		
	 }else{
		//  this.showToast("0"); 
		
		  this.GetAttendanceMeeting();
		 // this.showToast("0"); 
		
	 }
	   
	   
   }

 
 
   getUsername() {
	    //console.log("Get Username ");
    this.userData.getUsername().then((username) => {
       this.username = username;
	 
	//  console.log("Get Username :"+this.username);
    });
  }
  
    GetStatusAttendance(){
  this.meetingAttendanceData.GetStatusAttendance(this.username,this.attd_m_req_ID).subscribe((data: any) => {
		this.joined=data.Result;
    });
  }
  
   GetAttendanceMeetingList(){
  this.meetingAttendanceData.GetAttendanceMeetingList(this.username).subscribe((data: any) => {
		 console.log("Satu ");
      if (
        data 
      ) {
        for (const row of data) {      
                this.itemMeeting = row;
                break;          
        }
      }
    });
  }
  
   GetAttendanceList(){
  this.meetingAttendanceData.GetAttendanceList(this.attd_m_req_ID).subscribe((data: any) => {
	this.itemMeetingAttendance=data;
    });
		
  }
  
  GetAttendanceMeeting(){
  this.meetingAttendanceData.GetAttendanceMeeting(this.attd_m_req_ID).subscribe((data: any) => {
		 console.log("Masuk attendance meeting ");
      if (
        data 
      ) {
		//   this.showToast("ada data!"); 
		  // this.noData = false;
        for (const row of data) {      
                this.itemMeeting = row;
                break;          
        }
		 this.isShowCard = 1; 
		  this.GetAttendanceList();
		  this.GetStatusAttendance();
			//   this.showToast("Data not found!"); 
      }else
	  {
		   this.isShowCard = 0; 
		//  this.noData = true;
		  this.showToast("Data not found!"); 
	  }
    });
  }
  
	
}
