import { Component, ViewChild } from '@angular/core';

import { AlertController, App,  List, ModalController, NavController, ToastController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';
import { EmployeeData } from '../../providers/employee-data';
 import { LoadingController } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';
// import { EmployeeFilterPage } from '../employee-filter/employee-filter';
import 'rxjs/add/operator/debounceTime';
 


@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html'
})
export class EmployeePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  searchTerm = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  public allData: any;
  public newsData: any;
  loading: any;
 
  
  
  constructor(
   

    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
   //public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
	public employeeData: EmployeeData
	
  ) {
	  
  }

 
  
  
  ngOnInit() {
    this.getAllEmployeeData()
   // this.newsData = this.allData;
  }

	
	
   setFilteredItems() {
   console.log('1');

   this.getItems()
   //this.getAllEmployeeData();

   }
   
   async getAllEmployeeData(){
	  this.loading = this.loadingController.create({ content: "Please wait..." });
     this.loading.present();
     let result :any = await this.employeeData.getAllEmployeeData();
     this.allData = result.hasil;
     this.newsData = result.hasil;
     this.loading.dismiss();
  //   this.employeeData.getAllEmployeeData().subscribe((result) => {
  //   this.allData=result.hasil;
  //   this.newsData = this.allData;
  //   this.loading.dismiss();
	// });

	// this.loading.dismissAll();
   }
   
   getItems() {
    // Reset items back to all of the items
    //this.getAllEmployeeData();

    // set val to the value of the ev target
    var val = this.searchTerm;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //this.getAllEmployeeData();
      this.newsData = this.allData.filter((item) => {
        return (item.nama.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.newsData = this.allData;
    }
  }

    
  goToSessionDetail(item: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { item: item });
  }

 



}
