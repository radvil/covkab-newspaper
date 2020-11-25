import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page_title',
  template: `
    <div class="app-page-title">
      <div class="page-title-wrapper">
        <div class="page-title-heading">
          <div (click)="clickIcon()" class="page-title-icon">
            <i [class]="icon + ' icon-gradient bg-mean-fruit'"></i>
          </div>
          <div>
            <span class="page_title">{{ title }}</span>
            <div class="page-title-subheading">{{ subtitle }}</div>
          </div>
        </div>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./page_title.component.scss'],
})
export class PageTitleComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Output() onIconClicked = new EventEmitter<string>();

  clickIcon() {
    this.onIconClicked.emit();
  }
}
