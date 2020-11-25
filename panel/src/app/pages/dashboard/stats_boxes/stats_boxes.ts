import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats_boxes',
  template: `
    <div class="box_row">
      <div
        class="box_col card"
        *ngFor="let doc of docs"
        [style.background-color]="doc?.color"
        [routerLink]="doc?.link"
      >
        <div class="title">{{ doc?.label }}</div>
        <div class="number">{{ doc?.value }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./stats_boxes.scss'],
})
export class StatsBoxes {
  @Input() docs: [];

  constructor() {}
}
