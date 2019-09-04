import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TicketPage } from '../ticket/ticket';
import { AccountADPage } from '../accountAD/accountAD';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-helpdeskIT',
  templateUrl: 'helpdeskIT.html'
})
export class HelpdeskITPage {
 item: any;
username: string;

  constructor(
   // public ticketPage: TicketPage,
  public navCtrl: NavController,
     public userData: UserData
  ) { }
  
      ionViewDidLoad() {
		   console.log("Masuk Looh");
   this.getUsername() ;
	//this.getAbsenPegawaiPerDate();
  }
  
  goToAccountAD(){
	   this.navCtrl.push(AccountADPage,{ username: this.username });
  }
  
  
    goToTicket(){
	   this.navCtrl.push(TicketPage,{ username: this.username });
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
