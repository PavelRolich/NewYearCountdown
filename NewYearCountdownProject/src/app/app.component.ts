import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NewYearCountdownProject';
  time: Time;
  timer: string;
  intervalID: any;
  dogShow = false;

  constructor(private bottomSheet: MatBottomSheet) {}

  getTime(count: number): Time {
    const seconds = (count % 60) < 10 ? '0' + (count % 60).toString() : (count % 60).toString();
    count = (count - +seconds) / 60;
    const minutes = (count % 60) < 10 ? '0' + (count % 60).toString() : (count % 60).toString();
    count = (count - +minutes) / 60;
    const hours = (count % 24) < 10 ? '0' + (count % 24).toString() : (count % 24).toString();
    const days = (count - +hours) / 24 + '';
    return this.time = {
      seconds,
      minutes,
      hours,
      days
    };
  }

  getTimer() {
    const timeNow = new Date();
    const newYear = new Date(timeNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
    let counter = newYear.getTime() - timeNow.getTime();
    const timeOut = counter % 1000;
    counter = (counter - timeOut) / 1000;
    let newTime: Time = this.getTime(counter + 1);
    this.timer = newTime.days + ' : ' + newTime.hours + ' : ' + newTime.minutes + ' : ' + newTime.seconds;
    setTimeout(() => {
      newTime = this.getTime(counter + 1);
      this.timer = newTime.days + ' : ' + newTime.hours + ' : ' + newTime.minutes + ' : ' + newTime.seconds;
      this.intervalID = setInterval(() => {
        counter--;
        if (counter > 0) {
          newTime = this.getTime(counter + 1);
          this.timer = newTime.days + ' : ' + newTime.hours + ' : ' + newTime.minutes + ' : ' + newTime.seconds;
        } else {
          clearInterval(this.intervalID);
          this.timer = 'Vip\'em za new year!';
        }
      }, 1000);
    }, timeOut);
  }

  ngOnInit() {
    this.getTimer();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
    this.getTimer();
    setTimeout(() => {
      this.dogShow = true;
    }, 2000);
  }
}

export interface Time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
