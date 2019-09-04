import { Component } from '@angular/core';

 import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LeaveData } from '../../providers/leave-data';
import { ToastController } from 'ionic-angular';
 import { LoadingController } from 'ionic-angular';




@Component({
  selector: 'page-leave-approval',
  templateUrl: 'leave-approval.html'
})
export class LeaveApprovalPage {
 
	 item: any;
	 username : string;
		result : string;
	 id : string;
	 public newsData: any;
	 	  loading : any;
  constructor(
    public loadingController: LoadingController,
     public navCtrl: NavController,
	public userData: UserData,
	public leaveData: LeaveData,
	public navParams : NavParams,
		public toastCtrl: ToastController
  
   
  ) {}

 ionViewDidLoad() {
 this.getUsername();
this.GetLeaveRequestByID();
  }

  
  
  onApprove(st : string){
	   this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	  console.log("atu ");
	   this.leaveData.ApprovalLeaveRequest(this.navParams.data.id,st,'',this.username).subscribe((result) => {
		this.result=result.Result;
				 
	});
			this.loading.dismiss();
	this.showToast("Approved!"); 
	  this.navCtrl.pop();
  }
  
  onReject(st : string){
	  this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
	  console.log("atu ");
	    this.leaveData.ApprovalLeaveRequest(this.navParams.data.id,st,'',this.username).subscribe((result) => {
		this.result=result.Result;
				 
	});
			this.loading.dismiss();
	this.showToast("Rejected!"); 
	  this.navCtrl.pop();
  }
  
  GetLeaveRequestByID(){
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
	 this.leaveData.GetLeaveRequestByID(this.navParams.data.id).subscribe((result) => {
		this.newsData=result;
		console.log("dua ="+this.newsData);
				 
	})
			this.loading.dismiss();
  }
     getUsername() {
	    console.log("Get Username ");
    this.userData.getUsername().then((username) => {
      this.username = username;
	
	  console.log("Get Username :"+this.username);
    });
   }
   
  showToast(txt : string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }
}
