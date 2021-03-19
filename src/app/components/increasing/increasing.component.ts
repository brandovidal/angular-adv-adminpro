import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: []
})
export class IncreasingComponent implements OnInit {
  @Input() progress: number = 50;
  @Input() className: string = 'primary';

  @Output() emitValue: EventEmitter<number> = new EventEmitter()

  ngOnInit() {
    this.className = `btn btn-${this.className}`
  }

  onChange(value: number) {
    console.log('onChange ', value);
    if (value >= 100) {
      this.progress = 100
    } else if(value <= 0) {
      this.progress = 0
    } else {
      this.progress = value
    }
    this.emitValue.emit(this.progress)
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.emitValue.emit(100)
      return this.progress = 100
    }
    if (this.progress <= 0 && value <= 0) {
      this.emitValue.emit(0)
      return this.progress = 0
    }

    this.progress += value
    this.emitValue.emit(this.progress)
  }
}
