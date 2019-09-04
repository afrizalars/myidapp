import { Component } from '@angular/core';

// import { NavController } from 'ionic-angular';
import {  NavParams} from 'ionic-angular';
import { HelpdeskITData } from '../../providers/helpdeskIT-data';
// import { UserData } from '../../providers/user-data';




@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {
 
	
	 public newsData: any;
  constructor(
 
    
	public helpdeskITData: HelpdeskITData,
	public navParams : NavParams,
	 
  
   
  ) {}

  ionViewWillEnter() {
  
  this.getTicket();
  }
  
  

  getTicket(){
	console.log("test ="+this.navParams.data.username);
	 this.helpdeskITData.getTicket(this.navParams.data.username).subscribe((result) => {
		this.newsData=result;
		console.log("dua ="+this.newsData);
				 
	})
  }
  
 
}
