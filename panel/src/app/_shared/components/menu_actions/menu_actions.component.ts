import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu_actions',
  templateUrl: './menu_actions.component.html',
  styleUrls: ['./menu_actions.component.scss'],
})
export class MenuActionsComponent {
  @Input('selectedId') id: string;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Output() onClickedShow = new EventEmitter<string>();
  @Output() onClickedEdit = new EventEmitter<string>();
  @Output() onClickedDelete = new EventEmitter<string>();

  constructor() {}

  showData() {
    this.onClickedShow.emit(this.id);
  }

  editData() {
    this.onClickedEdit.emit(this.id);
  }

  deleteData() {
    this.onClickedDelete.emit(this.id);
  }
}
