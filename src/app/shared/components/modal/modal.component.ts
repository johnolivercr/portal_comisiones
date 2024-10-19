import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-component-modal',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() install = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onInstall(): void {
    this.install.emit();
  }
}
