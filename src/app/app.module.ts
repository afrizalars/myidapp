import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
// import { Router } from '@angular/router';
import { NgModule, ErrorHandler } from '@angular/core';
import { Device } from '@ionic-native/device';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
// import { ChartsModule } from 'ng2-charts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { NetworkInterface } from '@ionic-native/network-interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FormsModule } from '@angular/forms';


import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { AccountADPage } from '../pages/accountAD/accountAD';
// import { MapPage } from '../pages/map/map';
import { EmployeePage } from '../pages/employee/employee';
import { EmployeeFilterPage } from '../pages/employee-filter/employee-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { NewsPage } from '../pages/news/news-list';
import { TicketPage } from '../pages/ticket/ticket';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { AttendentPage } from '../pages/attendent/attendent';
import { AttendentHistoryPage } from '../pages/attendent-history/attendent-history';
import { MeetingAttendancePage } from '../pages/meeting-attendance/meeting-attendance';
import { MeetingAttendanceScanPage } from '../pages/meeting-attendance-scan/meeting-attendance-scan';
import { MeetingAttendanceListPage } from '../pages/meeting-attendance-list/meeting-attendance-list';
import { MeetingAttendanceViewPage } from '../pages/meeting-attendance-view/meeting-attendance-view';
import { MeetingAttendancePovrPage } from '../pages/meeting-attendance-povr/meeting-attendance-povr';
import { LeavePage } from '../pages/leave/leave';
import { LeaveReqPage } from '../pages/leave-req/leave-req';
import { LeaveApprovalPage } from '../pages/leave-approval/leave-approval';
import { LeaveApprovalListPage } from '../pages/leave-approval-list/leave-approval-list';
import { LeaveHistoryPage } from '../pages/leave-history/leave-history';
import { HelpdeskITPage } from '../pages/helpdeskIT/helpdeskIT';
import { ApplicationsPage } from '../pages/applications/applications';
import { WBSPage } from '../pages/wbs/wbs';
import { MessagePage } from '../pages/message/message';
import { AttendentPopoverPage } from '../pages/attendent-popover/attendent-popover';

import { AuthenticationPersonal } from '../interfaces/authentication-personal';
import { ConferenceData } from '../providers/conference-data';
import { UtilityProvider } from '../providers/utility/utility';
import { ApiData } from '../providers/api-data';
import { MeetingAttendanceData } from '../providers/meeting-attendance-data';
import { UserData } from '../providers/user-data';
import { EmployeeData } from '../providers/employee-data';
import { AttendentData } from '../providers/attendent-data';
import { HelpdeskITData } from '../providers/helpdeskIT-data';
import { LeaveData } from '../providers/leave-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
	HomePage,
    LoginPage,
    // MapPage,
    PopoverPage,
    EmployeePage,
    EmployeeFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    NewsPage,
    TabsPage,
    TutorialPage,
    SupportPage,
	AttendentPage,
	AttendentPopoverPage,
	AttendentHistoryPage,
	MeetingAttendancePage,
	MeetingAttendanceScanPage,
	MeetingAttendanceListPage,
	MeetingAttendanceViewPage,
	MeetingAttendancePovrPage,
	LeavePage,
	LeaveReqPage,
	LeaveApprovalPage,
	LeaveApprovalListPage,
	LeaveHistoryPage,
	HelpdeskITPage,
	TicketPage,
	AccountADPage,
	ApplicationsPage,
	WBSPage,
	MessagePage
  ],
  imports: [
	BrowserModule, 
 //   IonicModule.forRoot(), 
   // AppRoutingModule, 
	FormsModule,
	HttpModule,
	
    IonicModule.forRoot(ConferenceApp, {
		scrollPadding : true,
		scrollAssist: false
    
	},
	 {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: EmployeePage, name: 'Employee', segment: 'Employee' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: EmployeeFilterPage, name: 'EmployeeFilter', segment: 'EmployeeFilter' },
        { component: NewsPage, name: 'SpeakerList', segment: 'speakerList' },
		 { component: HomePage, name: 'Home'},
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        // { component: MapPage, name: 'Map', segment: 'map' },TicketPage
		{ component: HelpdeskITPage, name: 'HelpdeskIT', segment: 'helpdeskIT' },
		{ component: AttendentPage, name: 'Attendent', segment: 'attendent' },
		{ component: ApplicationsPage, name: 'Applications', segment: 'applications' },
		{ component: AttendentHistoryPage, name: 'AttendentHistory', segment: 'attendentHistory/:username' },
		{ component: MeetingAttendancePage, name: 'MeetingAttendance', segment: 'meetingAttendance/:id' },
		{ component: MeetingAttendanceScanPage, name: 'MeetingAttendanceScan', segment: 'meetingAttendanceScan' },
		{ component: MeetingAttendanceListPage, name: 'MeetingAttendanceList', segment: 'meetingAttendanceList' },
		{ component: LeavePage, name: 'Leave', segment: 'leave' },
		{ component: LeaveReqPage, name: 'LeaveReq', segment: 'leaveReq/:username' },
		{ component: LeaveApprovalListPage, name: 'LeaveApprovalList', segment: 'leaveApprovalList/:username' },
		{ component: LeaveApprovalPage, name: 'LeaveApproval', segment: 'leaveApproval/:id' },
		{ component: LeaveHistoryPage, name: 'LeaveHistory', segment: 'leaveHistory/:username' },
		{ component: AccountADPage, name: 'AccountAD', segment: 'accountAD/:username' },
		{ component: TicketPage, name: 'Ticket', segment: 'ticket/:username' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
		  { component: WBSPage, name: 'WBS', segment: 'wbs' },
		  	  { component: MessagePage, name: 'Message', segment: 'message' }
      ]
    }),
	IonicStorageModule.forRoot()
	// ,ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
	HomePage,
    LoginPage,
    // MapPage,
    PopoverPage,
    EmployeePage,
    EmployeeFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    NewsPage,
    TabsPage,
    TutorialPage,
    SupportPage,
	AttendentPage,
	AttendentPopoverPage,
	AttendentHistoryPage,
	MeetingAttendancePage,
	MeetingAttendanceScanPage,
	MeetingAttendanceListPage,
	MeetingAttendanceViewPage,
	MeetingAttendancePovrPage,
	LeavePage,
	LeaveReqPage,
	LeaveApprovalListPage,
	LeaveApprovalPage,
	LeaveHistoryPage,
	HelpdeskITPage,
	TicketPage,
	AccountADPage,
	ApplicationsPage,
	WBSPage,
	MessagePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
	FingerprintAIO,
	ApiData,
    ConferenceData,
	MeetingAttendanceData,
    UserData,
    InAppBrowser,
    SplashScreen,
	BarcodeScanner,
	UtilityProvider,
	UniqueDeviceID,
	QRScanner,
	Device,
	NetworkInterface,
	EmployeeData,
	AttendentData,
	HelpdeskITData,
	LeaveData,
	AuthenticationPersonal
  ]
},)
export class AppModule { }
