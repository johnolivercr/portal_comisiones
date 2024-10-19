import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  selector: 'app-epicrisis-edit-header',
  standalone: true,
  imports: [],
  templateUrl: './epicrisis-edit-header.component.html',
  styleUrl: './epicrisis-edit-header.component.scss'
})
export class EpicrisisEditHeaderComponent {
@Input() userName: string = '';
@Output() toggleContent = new EventEmitter<void>();

  constructor(public dialog: MatDialog){}

  saveEpicrisis(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Guardado de los datos',
        description: 'La epicrisis fue guardada con éxito, podría ingresar a editarla cuando lo necesite desde la lista de pacientes ',
        img: 'assets/images/modals/saveEpicrisis.svg',
        lblBtn: 'Ok'
      }
    });
    const instance = dialogRef.componentInstance;
    instance.install.subscribe(() => {
      //aca se mandaria a llamar a la funcion que guarda la epicrisis
      dialogRef.close();
    });
  }

  onToggleContent() {
    console.log("dd")
    this.toggleContent.emit();
  }

}
