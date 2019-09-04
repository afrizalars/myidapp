import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NavController } from 'ionic-angular';

import { MeetingAttendancePage } from '../meeting-attendance/meeting-attendance';

import { UserData } from '../../providers/user-data';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-meeting-attendance-scan',
  templateUrl: 'meeting-attendance-scan.html'
})
export class MeetingAttendanceScanPage {
 
	username : string;
	
  constructor(
 //  private barcodeScanner: BarcodeScanner,

 private qrScanner: QRScanner,
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
	 
   this.goToScanQR();
   }
       ionViewDidLoad() {
		
		   console.log("Masuk Looh");
   this.getUsername() ;
	//this.getAbsenPegawaiPerDate();
  }

  goToScanQR()
  {
	
	  	this.showToast("Masuk 1"); 
		 window.document.querySelector('ion-app').classList.add('transparentBody');
	  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
	 	this.showToast("Masuk 2"); 
     if (status.authorized) {
       // camera permission was granted

 	this.showToast("authrized"); 
       // start scanning

	     this.qrScanner.show();
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
		    	this.showToast("Masuk text"); 
         console.log('Scanned something', text);
this.showToast("Masuk hasil ;"+text); 

  this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
		  this.navCtrl.push(MeetingAttendancePage,{ id: text }).then(() => {
  let index = 1;
  this.navCtrl.remove(index);
});
       
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
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
