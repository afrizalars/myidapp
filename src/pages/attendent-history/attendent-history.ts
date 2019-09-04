import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { AttendentData } from '../../providers/attendent-data';
import { UserData } from '../../providers/user-data';
 import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-attendent-history',
  templateUrl: 'attendent-history.html'
})
export class AttendentHistoryPage {
	username : string;
	 item: any;
	 bulan : string;
	 tahun : string;
	 public newsData: any;
	  loading : any;
  constructor(
   public loadingController: LoadingController,
        public userData: UserData,
	public attendentData: AttendentData,
	public navParams : NavParams
  
   
  ) {}

  ionViewWillEnter() {
   
  }
   ionViewDidLoad() {
	
   this.getUsername() ;
 
	
	 
	
  }
  
   getUsername() {
	   
    this.userData.getUsername().then((username) => {
      this.username = username;
	  
	  
    });
  }
  onSearch(){
	   this.getAbsenPegawaiPerMonth();
	  console.log("atu ");
  }
  
  getAbsenPegawaiPerMonth(){
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
	 this.attendentData.getAbsenPegawaiPerMonth(this.username,this.bulan,this.tahun).subscribe((result) => {
		this.newsData=result;
		console.log("dua ="+this.newsData);
				 
	})
	this.loading.dismiss();
  }
  
 
}
