import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';

// import { AboutPage } from '../pages/about/about';
// import { HomePage } from '../pages/home/home';
// import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
// import { MapPage } from '../pages/map/map';
// import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
// import { TicketPage } from '../pages/ticket/ticket';
import { TutorialPage } from '../pages/tutorial/tutorial';
// import { EmployeePage } from '../pages/employee/employee';
// import { AttendentPage } from '../pages/attendent/attendent';
// import { HelpdeskITPage } from '../pages/helpdeskIT/helpdeskIT';
// import { ApplicationsPage } from '../pages/applications/applications';

// import { AttendentHistoryPage } from '../pages/attendent-history/attendent-history';
// import { NewsPage } from '../pages/news/news-list';
// import { MessagePage } from '../pages/message/message';
// import { SupportPage } from '../pages/support/support';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { EmployeeData } from '../providers/employee-data';
import { AttendentData } from '../providers/attendent-data';
import { HelpdeskITData } from '../providers/helpdeskIT-data';
//import { LeaveReqData } from '../providers/leaveReq-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  rootPage: any;
  username: string;
  // Datas: any;
  nama: string;
  group: string;
  foto: string;
  constructor(
    // private fcm: FCM,
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public employeeData: EmployeeData,
    public attendetData: AttendentData,
    public helpdeskITData: HelpdeskITData,
    //public leaveReqData: LeaveReqData,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {

          this.userData.hasLoggedIn().then((hasLoggedIn) => {
            if (hasLoggedIn) {
              this.rootPage = TabsPage;
            } else {
              this.rootPage = LoginPage;
            }

          });

        } else {

          this.rootPage = TutorialPage;
        }


      });


    this.platformReady()

    // load the conference data
    //this.getUsername();

    // decide which menu items should be hidden by current login status stored in local storage


  }



  getEmployeeData() {
    this.employeeData.getEmployeeData(this.username).subscribe((data: any) => {
      for (const row of data) {
        // this.Datas = row;
        this.nama = row['Nama'];
        this.group = row['zgroup'];
        this.foto = row['img'];
        break;
      }
    });


  }

  getUsername() {
    console.log("Get Username ");
    this.userData.getUsername().then((username) => {
      this.username = username;
      console.log("Get Username :" + this.username);
      this.getEmployeeData();

    });
  }





  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {

      this.splashScreen.hide();
    });
  }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
