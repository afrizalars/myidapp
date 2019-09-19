import { Component, ViewChild } from '@angular/core';
import { AttendentData } from '../../providers/attendent-data';
import { AuthenticationPersonal } from '../../interfaces/authentication-personal';
import { NavController, ActionSheetController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AttendentHistoryPage } from '../attendent-history/attendent-history';
import { AttendentPopoverPage } from '../attendent-popover/attendent-popover';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
// import { NetworkInterface } from '@ionic-native/network-interface';
import { PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


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
  absen: string = "";
  TimeIn: string = "";
  TimeOut: string = "";
  TimeCondition: string = "in"
  myDate: string = new Date().toISOString().substring(0, 10);

  constructor(
    public loadingController: LoadingController,
    private popoverController: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    // private networkInterface: NetworkInterface,
    public navCtrl: NavController,
    public attendentData: AttendentData,
    public userData: UserData,
    public authentication: AuthenticationPersonal,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    // private qrScanner: QRScanner
  ) { }


  ngOnInit() {
    this.personalNumber = localStorage.getItem("PersonalNumber");
    this.username = localStorage.getItem("username");

    // this.networkInterface.getWiFiIPAddress()
    //   .then(address => {
    //     alert(`WIFI --  IP: ${address.ip}, Subnet: ${address.subnet}`);
    //     this.showToast(`WIFI -- IP: ${address.ip}, Subnet: ${address.subnet}`); 
    //     this.ipaddress = address.ip;
    //     this.showToast('IP = '+address.ip);
    //     console.log("TES@")
    //     // this.getCheckPing();
    //   })
    //   .catch(error => {
    //     console.error(`Unable to get IP: ${error}`);
    //     // this.getCheckPing();
    //     this.showToast('Disconnected ! Please connect LPS Wifi..');
    //   }
    //   );
    this.getCheckPing()

    this.getabsentoday()
    this.checkTimeInOut()
  }

  ionViewDidEnter() {
    this.getCheckPing();
    this.isenabled = false;
  }

  ionViewWillEnter() {
    this.getCheckPing();
  }

  ionViewDidLoad() {
    this.loading = this.loadingController.create({ content: "Please wait..." });
    this.loading.present();
    this.isenabled = false;
    // this.startScan();

    this.getCheckPing();
    this.getTimeServer();
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
    this.attendentData.checkPing('192.168.10.130').subscribe((data: any) => {
      if (
        data
      ) {

        this.ResultMsg = (data.result).split("|", 2);
        console.log(this.ResultMsg)
        if (this.ResultMsg[0] == 'OK') {
          this.isenabled = false;
          this.absen = "ABSEN"
          this.showToast(this.ResultMsg[1]);
        }
        else {
          this.showToast(this.ResultMsg[1]);
          this.absen = "TIDAK DALAM JARINGAN LPS"
          this.isenabled = true;
        }
      }
    });
  }

  authBarcode(){
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.authResult = this.authentication.checkAuthApproval("barcode");
    console.log("Return :" + this.authResult);
  }

  getAbsenPegawaiPerDate() {
    //  this.updateChart();
    this.attendentData.getAbsenPegawaiPerDate(this.username, this.myDate).subscribe((data: any) => {
      console.log("Satu22 ");
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
    console.log("absen")
    // this.authBarcode()
    // this.attendentData.insertAbsen(this.username).subscribe((data: any) => {
    //   this.showToast("recorded at " + data.result);
    // });
  }

  // QrCodeAuth() {
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted
  //         // start scanning

  //         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //           console.log('Scanned something', text);

  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //         });

  //       } else if (status.denied) {
  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }

  checkTimeInOut() {
    this.attendentData.getTimeInOut(this.username).subscribe((data: any) => {
      this.attendentData.getAbsenRecord(this.username).subscribe((data2: any) => {
        if (data2.result.length > 1) {
          this.TimeIn = data.result[0].attd_records_TimeIN
          this.TimeOut = data.result[0].attd_records_TimeOut
        } else if (data2.result.length == 1) {
          this.TimeIn = data.result[0].attd_records_TimeIN
          this.TimeOut = "belum absen keluar"
        } else {
          this.TimeIn = "belum absen"
          this.TimeOut = ""
        }
      })
    });
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

  getabsentoday() {
    this.attendentData.getabsentoday(this.personalNumber).subscribe((data: any) => {
      console.log("Chart Rekap Absen Individu ");
      let label = []
      let dataAbsen = []

      for (var row of data.hasil) {
        label.push(row.category)
        dataAbsen.push(row.total)
      }
      console.log(label)
      console.log(dataAbsen)
      this.getChart(label, dataAbsen)
    });
  }

  getChart(label, data) {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: label,
        //  labels : this.dataChartLabel,
        datasets: [
          {
            label: "# of Votes",
            data: data,
            legend: {
              enabled: false
            },
            options: {
              legend: {
                enabled: false,
                display: false,
                labels: {
                  display: false
                }
              }
            },
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
