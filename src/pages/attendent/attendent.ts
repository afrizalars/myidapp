import { Component, ViewChild } from '@angular/core';
import { AttendentData } from '../../providers/attendent-data';
import { AuthenticationPersonal } from '../../interfaces/authentication-personal';
import { NavController, ActionSheetController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AttendentHistoryPage } from '../attendent-history/attendent-history';
import { AttendentPopoverPage } from '../attendent-popover/attendent-popover';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NetworkInterface } from '@ionic-native/network-interface';
import { PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';



@Component({
  selector: 'page-attendent',
  templateUrl: 'attendent.html'
})
export class AttendentPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  pieChart: any;
  ipaddress: string;
  authResult: any;
  ResultMsg: string;
  isenabled: boolean = false;
  item: any;
  personalNumber: string;
  timeServer: string;
  username: string;
  loading: any;
  dataChartLabel: any;
  dataChartValue: any;
  private doughnutChart: Chart;
  myDate: string = new Date().toISOString().substring(0, 10);
  // public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData:number[] = [350, 450, 100];
  // public doughnutChartType:string = 'doughnut';
  // currentDate : string;
  constructor(
    public loadingController: LoadingController,
    private popoverController: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private networkInterface: NetworkInterface,
    public navCtrl: NavController,
    public attendentData: AttendentData,
    public userData: UserData,
    public authentication: AuthenticationPersonal,
    
    public alertCtrl: AlertController,
    public toastCtrl: ToastController

  ) { }

  ngOnInit() {

    this.personalNumber = localStorage.getItem("PersonalNumber");
    this.username = localStorage.getItem("username");

    this.networkInterface.getWiFiIPAddress()
      .then(address => {
        alert(`WIFI --  IP: ${address.ip}, Subnet: ${address.subnet}`);
        //this.showToast(`WIFI -- IP: ${address.ip}, Subnet: ${address.subnet}`); 
        this.ipaddress = address.ip;
        //	this.showToast('IP = '+address.ip);
        this.getCheckPing();

      })
      .catch(error => {
        console.error(`Unable to get IP: ${error}`);
        this.showToast('Disconnected ! Please connect LPS Wifi..');
      }
      );

    this.getChartData();
    this.getChart();
  }

  ionViewDidEnter() {
    this.isenabled = false;
    this.getAbsenPegawaiPerDate();
    //	 this.updateChart();
    //  setInterval(() => this.getTimeServer(), 1000);


    // this.networkInterface.getWiFiIPAddress()


  }




  ionViewDidLoad() {
    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();

    this.isenabled = false;
    //	this.startScan();

    this.getTimeServer();
    //this.updateChart();

    this.getAbsenPegawaiPerDate();
    this.loading.dismiss();



  }
  goToAttendentHistory() {
    this.navCtrl.push(AttendentHistoryPage, { username: this.username });
  }


  getTimeServer() {
    this.attendentData.getTimeServer().subscribe((data: any) => {
      console.log("Get Time Server");
      if (
        data
      ) {

        this.timeServer = data.hasil[0].timeServer;
      }
    });
  }


  getCheckPing() {

    this.attendentData.checkPing(this.ipaddress).subscribe((data: any) => {

      if (
        data
      ) {

        this.ResultMsg = (data.Result).split("|", 2);
        if (this.ResultMsg[0] == 'OK') {
          this.isenabled = true;
          this.showToast(this.ResultMsg[1]);
        }
        else {
          this.showToast(this.ResultMsg[1]);
          this.isenabled = false;
        }



      }
    });
  }

  getAbsenPegawaiPerDate() {
    //  this.updateChart();
    this.attendentData.getAbsenPegawaiPerDate(this.username, this.myDate).subscribe((data: any) => {
      console.log("Satu ");
      if (
        data
      ) {
        for (const row of data.hasil) {
          this.item = row;

          break;
        }
      }
    });
  }

  async absenNow() {

    this.authResult = await this.authentication.checkAuthApproval("biometric");
    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
    // this.attendentData.insertAbsen(this.username).subscribe((data: any) => {
    //   console.log("Satu ");
    //   if (
    //     data
    //   ) {
    //     for (const row of data) {


    //       this.item = row;
    //       break;



    //     }
    //   }
    // });
    this.loading.dismiss();
    this.showToast("Absen Berhasil !");
    this.getAbsenPegawaiPerDate();
  }

  showToast(txt: string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

  presentPopover(event: Event) {
    let popover = this.popoverController.create(AttendentPopoverPage);
    popover.present({ ev: event });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Menu',
      buttons: [
        {
          text: 'History',
          icon: 'document',
          handler: () => {
            this.navCtrl.push(AttendentHistoryPage);
            //  this.moveDocumentModal(document);
            console.log('Move clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  getChartData() {
    let dataChartLabel = [];
    let dataChartValue = [];
    this.attendentData.GetAbsenPegawaiCurrentYear(this.personalNumber).subscribe((data: any) => {
      console.log("Satu ");
      if (
        data
      ) {
        dataChartLabel.concat(data.label);
        // this.dataChartLabel = ;
        console.log('datalabel : ' + this.dataChartLabel)
        dataChartValue.concat(data.value);
        // this.dataChartValue = data.value;
        console.log('datavalue : ' + this.dataChartValue)
      }
    });
  }

  getChart() {



    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //  labels : this.dataChartLabel,
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            // data : this.dataChartValue,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
  }

}
