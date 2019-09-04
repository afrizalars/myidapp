import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { HelpdeskITData } from '../../providers/helpdeskIT-data';
// import { UserData } from '../../providers/user-data';

import { AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-accountAD',
  templateUrl: 'accountAD.html'
})
export class AccountADPage {
	public StatusAccount: string;
	public newPassword: string;
	public username: string;
	 public newsData: any;
  constructor(
 
    
	public helpdeskITData: HelpdeskITData,
	public navParams : NavParams,
	public alertCtrl : AlertController,
	public toastCtrl: ToastController
	 
  
   
  ) {}

  ionViewWillEnter() {
  this.username = this.navParams.data.username;
  //this.getTicket();
  }
    ionViewDidLoad() {
		 this.getStatusAccountAD();
   
	//this.getAbsenPegawaiPerDate();
  }
  
  unlockAccount(){
	  	  this.helpdeskITData.unlockAccountAD(this.navParams.data.username).subscribe((result) => {
		 this.newsData=result;
		  });
		 console.log("dua ="+this.newsData);
		  this.getStatusAccountAD();
	   this.showToast("Unlock Account Successfully");
  }
  
   changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'password',
      // value: this.username,
	  type : 'password',
      placeholder: 'your new password'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
       // this.userData.setUsername(data.username);
       // this.getUsername();
	   
	 this.helpdeskITData.resetPasswordAD(this.navParams.data.username,data.password).subscribe((result) => {
		 this.newsData=result;
		  });
	  
	   console.log("Your new Password :"+data.password);
	    this.getStatusAccountAD();
	   this.showToast("Reset Password Successfully");
      }
    });
	
		
	
	
	
    alert.present();
  }
  
  showToast(txt : string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

   getStatusAccountAD(){
	 console.log("test ="+this.navParams.data.username);
	  this.helpdeskITData.getStatusAccountAD(this.navParams.data.username).subscribe((result) => {
		 this.StatusAccount=result.Result;
		
				 
	 })
   }
   
   
  
 
}
