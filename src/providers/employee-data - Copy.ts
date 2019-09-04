import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EmployeeData {
   data: any;

  constructor(public http: Http, public user: UserData) { }
  

	async getAllEmployeeData(){
			  console.log("Masuk function call ws");
			  
			  return new Promise(resolve => {
				this.http.get('http://192.168.10.130:3030/getlistpegawai')
				.subscribe(
					data => {
					  resolve(JSON.parse(data['_body']));
					}
				);
			  });
   // return this.http.get('http://lps-srvweb/mobileapi/lpsmobileappws.asmx/GetDataPegawai?username=*').map(res => res.json());
	//  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetDataPegawai?username=*').map(res => res.json());
	  //return this.http.get('http://192.168.10.130:3030/getlistpegawai').map(res => res.json());
	  
   }
  getEmployeeData(username: string){
		      console.log("Masuk function call ws");
   // return this.http.get('http://lps-srvweb/mobileapi/lpsmobileappws.asmx/GetDataPegawai?username=*').map(res => res.json());
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetDataPegawai?username='+username).map(res => res.json());
	
   }
  
  
    // // public getEmployeeData(username: string){
				
	   // // return this.http.get('http://lps-srvweb/mobileapi/lpsmobileappws.asmx/GetDataPegawai?username='+username).map(res =>
	 // // {
		
	 // // this.data = res.json();
	  // // // console.log("success : "+this.data.length);
	   // // // console.log('ini data :' +this.data);
	  // // return this.data;
	 
	
	    // // });  
	
	 // // }
	 
	  // public getAllEmployeeData(){
		  
		   // console.log("Masuk function call ws");
				
	  // return this.http.get('http://lps-srvweb/mobileapi/lpsmobileappws.asmx/GetDataPegawai?username=*').map(res =>
	 // {

	 // let data = res.json();
	  // console.log("Success : "+data.length);
	 // return data;
	 // })
	 // }
	 
	 
	 
	 // public getAllEmployeeData(){
				
	   // return this.http.get('http:///mobileapi/lpsmobileappws.asmx/GetDataPegawai?username=*').map(res =>
	 // {
		
	 // this.data = res.json();
	  // // console.log("success : "+this.data.length);
	   // // console.log('ini data :' +this.data);
	  // return this.data;
	 
	
	    // });  
	
	 // }
	 
	 
	 // getEmployeeDataByUsername(username: string){
	   // return this.http.get('http://lps-srvweb/mobileapi/lpsmobileappws.asmx/GetDataPegawai?username='+username).map(res =>
	 // {
		
	 // this.data = res.json();
	  // console.log("success : "+this.data.length);
	   // console.log('ini data :' +this.data);
	  // return this.data;
	 
	
	    // });  
	
	 // }
   
   
}
