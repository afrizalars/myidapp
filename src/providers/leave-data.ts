import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaveData {
   data: any;

  constructor(public http: Http, public user: UserData) { }
  

	getKuotaCuti(username : string){
		      console.log("Masuk function call GetKuotaCuti");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetKuotaCuti?username='+username).map(res => res.json());
	
   }
   
   
	getRefKeteranganLeave(){
		      console.log("Masuk function call ws GetRefketeranganCuti");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetRefketeranganCuti').map(res => res.json());
	
   }
   
   	insertCuti(startDate : string,endDate:string,leaveType:string,reason:string,username : string){
		      console.log("Masuk function insert absen");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/insertCuti?startDate='+startDate+'&endDate='+endDate+'&leaveType='+leaveType+'&reason='+reason+'&username='+username).map(res => res.json());
	
   }
   
   getCountApprovaLeave(username : string){
		      console.log("Masuk function getCountApprovaLeave");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/getCountApprovaLeave?username='+username).map(res => res.json());
	
   }
   
    GetPendingApprovalLeave(username : string){
		      console.log("Masuk function getCountApprovaLeave");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetPendingApprovalLeave?username='+username).map(res => res.json());
	
   }
   
    GetHistoryLeave(username : string,month : string, year : string){
		      console.log("Masuk function getCountApprovaLeave");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetHistoryLeave?username='+username+'&month='+month+'&year='+year).map(res => res.json());
	
   }
    GetLeaveRequestByID(id : string){
		      console.log("Masuk function GetLeaveRequestByID");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetLeaveRequestByID?id='+id).map(res => res.json());
	
   }
   ApprovalLeaveRequest(id : string,statusApproval : string,comment:string,username: string){
		      console.log("Masuk function GetLeaveRequestByID");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/ApprovalLeaveRequest?id='+id+'&statusApproval='+statusApproval+'&comment='+comment+'&username='+username).map(res => res.json());
	
   }
   
}
