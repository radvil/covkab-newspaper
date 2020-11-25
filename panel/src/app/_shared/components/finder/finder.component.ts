import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  @Output() onKeyUp = new EventEmitter<string>();

  findData(value: string) {
    this.onKeyUp.emit(value);
  }

  constructor() {}
}
