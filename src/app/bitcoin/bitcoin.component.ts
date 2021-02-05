import {Component, OnInit} from '@angular/core';
import {BitcoinService} from '../bitcoin.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.sass']
})

export class BitcoinComponent implements OnInit {
  // @ts-ignore
  startDate: string;
  // @ts-ignore
  endDate: string;
  dataFetched = false;
  data: any;
  lineChartData: ChartDataSets[] = [
    {data: [1], label: 'Bitcoin Price', fill: false},
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',

      backgroundColor: 'rgba(63,81,181,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private bitcoinService: BitcoinService
  ) {
  }

  ngOnInit(): void {
    const filters = {startDate: moment().subtract(10, 'days').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD')};
    this.getBPI(filters);
  }

  // tslint:disable-next-line:typedef
  getBPI(filters: { startDate: string; endDate: string; }) {
    this.bitcoinService.getBPIData(filters).subscribe(
      result => {
        this.data = result;
        // @ts-ignore
        this.lineChartData[0].data = Object.values(this.data.data);
        this.lineChartLabels = Object.keys(this.data.data);
        this.dataFetched = true;
      }, error => {
        console.log('Service Error: ', error);
      });
  }

  // tslint:disable-next-line:typedef
  changeStartDate(event: MatDatepickerInputEvent<any>) {
    this.startDate = moment(event.value).format('YYYY-MM-DD');
  }

  // tslint:disable-next-line:typedef
  changeEndDate(event: MatDatepickerInputEvent<any>) {
    this.endDate = moment(event.value).format('YYYY-MM-DD');
  }


  // tslint:disable-next-line:typedef
  applyFilter() {
    const filters = {
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.getBPI(filters);
  }


}
