import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeFilterComponent } from '../home-filter/home-filter.component';
import { EpicrisisEditComponent } from '../epicrisis-edit/epicrisis-edit.component';
import { FooterComponent } from '@grupomontecristo/footer';
import {
  TableComponent,
  createColumn,
} from '../../../../shared/components/table/table.component';
import { Config } from '../../../../shared/components/table/interface/config.interface';
import {
  Column,
  ColumnType,
} from '../../../../shared/components/table/interface/column.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { environment } from '../../../../../environments/environment';
import { CardsTableComponent } from "../../../../shared/components/cards-table/cards-table.component";
import { LangModule } from "../../../../shared/components/dropdown/lang/lang.module";
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-component-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    HomeFilterComponent,
    EpicrisisEditComponent,
    FooterComponent,
    TableComponent,
    CardsTableComponent,
    LangModule,
    ModalComponent
  ]
})
export class TabsComponent {
  [x: string]: any;
  tabs = ['Todas las epicrisis'];
  selected = new FormControl(0);
  tabTitlePrincipal = 'Todas las epicrisis';
  _tabsComponent: any[] = [];
  footerAlign: 'initial' | 'center' | 'end' = 'initial';
  companyName = 'Montecristo';
  _config: Config;
  dataSource: any[] = [];

  sortOptions = [
    { name: 'short_name', text: 'Por orden alfabético A-Z', sort: 'asc' },
    { name: 'short_name', text: 'Por orden alfabético Z-A', sort: 'desc' },
    { name: 'code', text: 'Por número de encuentro', sort: 'asc' },
    { name: 'create_date', text: 'Por orden de modificación', sort: 'asc' },
  ];

  constructor(
    private readonly _localStorageService: LocalStorageService,
    public dialog: MatDialog

  ) {
    this._config = this.initTable();
    this.generateFakeData();
  }

  ngOnInit(): void {
    this.initTable();
  }
  initTable = (): Config => {
    this._tabsComponent = this._localStorageService.getDataArrayDecrypt(environment.localStorage.saveTab);
    const columns: Column[] = [
      createColumn('short_name', 'Nombre del paciente', ColumnType.TEXT),
      createColumn('id', 'Número de identificación', ColumnType.TEXT),
      createColumn('code', 'Número de encuentro', ColumnType.TEXT),
      createColumn('create_date', 'Fecha de creación', ColumnType.TEXT),
      createColumn('program_date', 'Fecha programada', ColumnType.TEXT),
      createColumn('state_code', 'Estado', ColumnType.STATE),
      createColumn(
        'edit',
        'Acciones',
        ColumnType.BUTTON,
        '',
        'edit',
        this.onEdit.bind(this)
      ),
    ];

    const options: Config = {
      title: '',
      subTitle: '',
      displayedColumns: columns,
      tableHeight: 'calc(100vh - 21rem)',
    };

    return options;
  };

  // Método para generar datos ficticios
  generateFakeData() {
    this.dataSource = [
      {
        id: '102450951',
        short_name: 'Hector Gonzalez Sandí',
        code: '000291',
        position: 0,
        create_date: '25.05.2023',
        program_date: '25.02.2023',
        state_code: 'delet',
        state: 'Borrador',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450952',
        short_name: 'Fernanda Flores Solano',
        code: '000292',
        position: 0,
        create_date: '27.02.2023',
        program_date: '25.02.2023',
        state_code: 'finish',
        state: 'Finalizado',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450953',
        short_name: 'Sirley Barboza de la O',
        code: '000293',
        position: 0,
        create_date: '29.10.2023',
        program_date: '25.02.2023',
        state_code: 'approved',
        state: 'Aprobado',
        action: this.openDialogTrash.bind(this)
      },
      {
        id: '102450954',
        short_name: 'Jose Luis Nuñez Baldodano',
        code: '000294',
        position: 0,
        create_date: '03.04.2023',
        program_date: '25.02.2023',
        state_code: 'delet',
        state: 'Borrador',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450955',
        short_name: 'Ernesto Soto Castegnaro',
        code: '000295',
        position: 0,
        create_date: '20.06.2023',
        program_date: '25.02.2023',
        state_code: 'finish',
        state: 'Finalizado',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450951',
        short_name: 'Hector Gonzalez Sandí',
        code: '000291',
        position: 0,
        create_date: '25.05.2023',
        program_date: '25.02.2023',
        state_code: 'delet',
        state: 'Borrador',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450953',
        short_name: 'Sirley Barboza de la O',
        code: '000293',
        position: 0,
        create_date: '29.10.2023',
        program_date: '25.02.2023',
        state_code: 'approved',
        state: 'Aprobado',
        action: this.openDialogTrash.bind(this)
      },
      {
        id: '102450954',
        short_name: 'Jose Luis Nuñez Baldodano',
        code: '000294',
        position: 0,
        create_date: '03.04.2023',
        program_date: '25.02.2023',
        state_code: 'delet',
        state: 'Borrador',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450955',
        short_name: 'Ernesto Soto Castegnaro',
        code: '000295',
        position: 0,
        create_date: '20.06.2023',
        program_date: '25.02.2023',
        state_code: 'finish',
        state: 'Finalizado',
        action: this.onEdit.bind(this)
      },
      {
        id: '102450951',
        short_name: 'Hector Gonzalez Sandí',
        code: '000291',
        position: 0,
        create_date: '25.05.2023',
        program_date: '25.02.2023',
        state_code: 'delet',
        state: 'Borrador',
        action: this.onEdit.bind(this)
      },
    ];
  }

  onEdit(row: any) {
    row.position = this._tabsComponent.length;
    this._localStorageService.setDataArray(environment.localStorage.saveTab, row);
    this._tabsComponent = this._localStorageService.getDataArrayDecrypt(environment.localStorage.saveTab);
    const lastIndex = this._tabsComponent.length - 1;
    let positionActually = 0;
    const isDuplicate = this._tabsComponent.some((item: any) => {
      positionActually = item.position;
      return item.id === row.id;
    });
    if (!isDuplicate) {
      this.selected.setValue(lastIndex + 1);
    } else {
      this.selected.setValue(positionActually + 1);
    }
  }

  removeTab(index: number, position: number) {
    this._localStorageService.onRemoveArray(environment.localStorage.saveTab, position);
    this._tabsComponent = this._localStorageService.getDataArrayDecrypt(environment.localStorage.saveTab);
    this.selected.setValue(index);
  }

  openDialogTrash(person: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: '¿Está seguro que desea eliminar la transcripción?',
        description: 'Al eliminarla se perderán todos los datos transcritos y recibidos para esta epicrisis.',
        img: 'assets/images/modals/delet.png',
        lblBtn: 'Sí, deseo eliminarla'
      }
    });
    const instance = dialogRef.componentInstance;
    instance.install.subscribe(() => {
      this.onInstall(person);
      dialogRef.close();
    });
  }

  onInstall(person: any): void {
    console.log(person)
  }

}
