import { Component, EventEmitter, Output } from '@angular/core';
import { TableComponent, createColumn } from "../../../../../../shared/components/table/table.component";
import { Config } from '@app/shared/components/table/interface/config.interface';
import { Column, ColumnType } from '@app/shared/components/table/interface/column.interface';
import { HomeFilterComponent } from "../../../home-filter/home-filter.component";

@Component({
    selector: 'ngx-component-epicrisis-history',
    standalone: true,
    templateUrl: './epicrisis-history.component.html',
    styleUrl: './epicrisis-history.component.scss',
    imports: [TableComponent, HomeFilterComponent]
})
export class EpicrisisHistoryComponent {
  _config: Config;
  dataSource: any[] = [];
  @Output() toggleContent = new EventEmitter<void>();

  constructor(){
    this._config = this.initTable();
    this.generateFakeData()
  }

  ngOnInit(): void {
    this.initTable();
  }
  initTable = (): Config => {
      const columns: Column[] = [
      createColumn('action', 'Acción realizada', ColumnType.TEXT),
      createColumn('create_date', 'Fecha de acción', ColumnType.TEXT),
      createColumn('user', 'Usuario responsable', ColumnType.TEXT),
      createColumn('system', 'Sistema ', ColumnType.TEXT)
    ];

    const options: Config = {
      title: '',
      subTitle: '',
      displayedColumns: columns,
      tableHeight: 'calc(100vh - 22rem)',
    };

    return options;
  };

  sortOptions = [
    { name: 'action', text: 'Por orden alfabético A-Z', sort: 'asc' },
    { name: 'user', text: 'Por orden alfabético Z-A', sort: 'desc' },
    { name: 'system', text: 'Por orden alfabético Z-A', sort: 'asc' },
    { name: 'create_date', text: 'Por orden de modificación', sort: 'asc' },
  ];

    // Método para generar datos ficticios
    generateFakeData() {
      this.dataSource = [
        {
          id: '1',
          action: 'Edición de transcripción',
          create_date: '25.05.2023',
          user: 'Fernando García Chacón',
          system: 'Grupo Montecristo'
        },
        {
          id: '2',
          action: 'Transcripción aprobada',
          create_date: '25.05.2023',
          user: 'Fernando García Chacón',
          system: 'Grupo Montecristo'
        },
        {
          id: '3',
          action: 'Edición de transcripción',
          create_date: '25.05.2023',
          user: 'Fernando García Chacón',
          system: 'Grupo Montecristo'
        },
        {
          id: '4',
          action: 'Edición de transcripción',
          create_date: '25.05.2023',
          user: 'Fernando García Chacón',
          system: 'Grupo Montecristo'
        }
      ];
    }

    onToggleContent() {
      this.toggleContent.emit();
    }

}
