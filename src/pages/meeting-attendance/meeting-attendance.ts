import { Component } from '@angular/core';

// import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { NavController ,  ActionSheetController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';

// import { MeetingAttendanceScanPage } from '../meeting-attendance-scan/meeting-attendance-scan';
import { MeetingAttendancePovrPage } from '../meeting-attendance-povr/meeting-attendance-povr';
import { MeetingAttendanceListPage } from '../meeting-attendance-list/meeting-attendance-list';
import { PopoverController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { MeetingAttendanceData } from '../../providers/meeting-attendance-data';
import { ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
 import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-meeting-attendance',
  templateUrl: 'meeting-attendance.html'
})
export class MeetingAttendancePage {
 isShowCard :number =0 ;
	username : string;
	attd_m_req_ID : string ='';
	itemMeeting: any;
	itemMeetingAttendance: any;
	joined : number ;
	  loading : any;
	
  constructor(
          public loadingController: LoadingController,
 //  private barcodeScanner: BarcodeScanner,
   private barcodeScanner: BarcodeScanner,
    private popoverController: PopoverController,
	    public actionSheetCtrl: ActionSheetController,
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
  gotoScan() {
    this.barcodeScanner.scan().then(barcodeData => {
     // alert('Barcode data ' + JSON.stringify(barcodeData));
      this.attd_m_req_ID = barcodeData.text;
	  this.showCard();
	  //this.scannedData = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  // gotoScan()
  // {
	  
	  // // nav.push(MyPage);
	  // // MyPage.onPop(data => { console.log(data); });
	  // this.navCtrl.push(MeetingAttendanceScanPage,{ username: this.username });

  // }
       ionViewDidLoad() {
		   
		 // this.attd_m_req_ID = '96983529-B546-44F5-8681-5A6B8F70FEA6';
		 this.attd_m_req_ID = null;
		   this.getUsername() ;
		
		this.showCard();
		   console.log("Masuk Looh");
 
  

  }

      ionViewDidEnter() {
	//this.showCard();
 
   }
   
   
   join(){
	   	  this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	   this.meetingAttendanceData.insertJoinMeetingRecords(this.username,this.attd_m_req_ID).subscribe((data: any) => {
	//this.itemMeetingAttendance=data;
	console.log(data);
    });
	  
	
	 this.GetAttendanceList();
	this.joined = 1;
	this.showToast("Joined!"); 
		this.loading.dismiss();
		//this.loading.dismiss();
   }
   
   unjoin(){
	   	  this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	   this.meetingAttendanceData.insertUnJoinMeetingRecords(this.username,this.attd_m_req_ID).subscribe((data: any) => {
	//this.itemMeetingAttendance=data;
	console.log(data);
    });
	  	
	
	 this.GetAttendanceList();
	this.joined = 0;
	this.showToast("Unjoined!"); 
	this.loading.dismiss();
   }
   
   
   
   showCard(){
	   
	  // this.attd_m_req_ID = this.navParams.data.id;
	//   this.attd_m_req_ID = '5D9C5714-E40B-4716-B938-934656BDA7D6';
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
   presentPopover(event: Event) {
    let popover = this.popoverController.create(MeetingAttendancePovrPage);
    popover.present({ ev: event });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Menu',
      buttons: [
        {
          text: 'History',
		   icon:'document' ,
          handler: () => {
			   this.navCtrl.push(MeetingAttendanceListPage);
          //  this.moveDocumentModal(document);
            console.log('Move clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
	    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
  this.meetingAttendanceData.GetAttendanceMeeting(this.attd_m_req_ID).subscribe((data: any) => {
		 console.log("Masuk attendance meeting ");
		 
      if (
        JSON.stringify(data) != '[]' 
      ) {
		//   this.showToast("ada data!"); 
		  // this.noData = false;
        for (const row of data) {      
                this.itemMeeting = row;
                break;          
        }
		// this.showToast("id : "+this.itemMeeting); 
		 this.isShowCard = 1; 
		  this.GetAttendanceList();
		  this.GetStatusAttendance();
			   //this.showToast("Data not found!"); 
      }else
	  {
		  
		   this.isShowCard = 0; 
		//  this.noData = true;
		  	this.loading.dismiss();
		  this.showToast("Data not found!"); 
	  }
	    	
    });
	this.loading.dismiss();
  }
  
	
}
