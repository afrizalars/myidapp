import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



@Injectable()
export class HelpdeskITData {
   data: any;

  constructor(public http: Http, public user: UserData) { }
  
  
  getStatusAccountAD(username : string){
	   return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetStatusAccount?username='+username).map(res => res.json());
	 // return username;
  }
  
    unlockAccountAD(username : string){
		 return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/UnlockPassword?username='+username).map(res => res.json());
	 // return username;
  }
  
  resetPasswordAD(username :string, newpassword :string){
	  
	   return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/ResetPassword?username='+username+'&password='+newpassword).map(res => res.json());
	  //return username+' '+newpassword;
  }
   getTicket(username : string){
		      console.log("Masuk function call getTickets");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetTicket?username='+username).map(res => res.json());
	
   }

  
   
   
}
