import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class MeetingAttendanceData {
   data: any;

  constructor(public http: Http, public user: UserData) { }
  

	GetStatusAttendance(username : string,attd_m_req_ID :string){
		      console.log("Masuk function call GetStatusAttendance");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetStatusAttendance?username='+username+'&attd_m_req_ID='+attd_m_req_ID).map(res => res.json());
	
   }
   
   
	GetAttendanceMeetingList(username : string){
		      console.log("Masuk function call ws GetAttendanceMeetingList");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetAttendanceMeetingList?username='+username).map(res => res.json());
	
   }
   
   GetAttendanceList(attd_m_req_ID : string){
		      console.log("Masuk function call ws GetAttendanceList");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetAttendanceList?attd_m_req_ID='+attd_m_req_ID).map(res => res.json());
	
   }
   
    GetAttendanceMeeting(attd_m_req_ID : string){
		      console.log("Masuk function call ws GetAttendanceMeeting");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetAttendanceMeeting?attd_m_req_ID='+attd_m_req_ID).map(res => res.json());
	
   }
   
   	insertJoinMeetingRecords(username : string,attd_m_req_ID : string){
		      console.log("Masuk function insertJoinMeetingRecords");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/insertJoinMeetingRecords?username='+username+'&attd_m_req_ID='+attd_m_req_ID).map(res => res.json());
	
   }
     	insertUnJoinMeetingRecords(username : string,attd_m_req_ID : string){
		      console.log("Masuk function insertUnJoinMeetingRecords");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/insertUnJoinMeetingRecords?username='+username+'&attd_m_req_ID='+attd_m_req_ID).map(res => res.json());
	
   }	
  
   
   
}
