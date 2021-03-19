import { Component, Input } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {
  @Input() title = 'Sin titulo'
  // Doughnut
  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet = [[]];
  @Input() colors: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }]

  constructor() { }

}
