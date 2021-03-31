import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progress1: number = 10;
  progress2: number = 50;

  get getPercentage1() {
    return `${this.progress1}%`
  }

  get getPercentage2() {
    return `${this.progress2}%`
  }

  emitValue(value: number) {
    console.log(value)
  }
}
