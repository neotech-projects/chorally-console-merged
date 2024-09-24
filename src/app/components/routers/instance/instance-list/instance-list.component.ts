import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/shared/snackbar/snackbar.component';
import { BlankState } from 'src/app/core/enums/blank-state';
import { InstanceModel } from 'src/app/core/models/instance/instance.model';
import { InstanceService } from 'src/app/core/services/instance/instance.service';
import * as FORM_INSTANCE from 'src/app/core/storage/form-storage';
import Utils from 'src/app/core/utils/utils';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss'],
})
export class InstanceListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'package', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  searchTerm: string = '';

  items = signal<InstanceModel[]>([]);
  dataSource = new MatTableDataSource<any>(this.items());

  constructor(
    private _router: Router,
    private _instanceService: InstanceService,
    private _snackBar: MatSnackBar
  ) {
    FORM_INSTANCE.reset();
    this.getInstances();
  }

  getInstances() {
    this._instanceService.getInstances().subscribe({
      next: (data) => {
        this.items = signal<InstanceModel[]>(data);
        Utils.sortInstancesById(this.items);
        this.dataSource = new MatTableDataSource<any>(this.items());
      },
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante il recupero delle istanze',
            type: 'danger',
          },
        });
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  onAdd() {
    this._router.navigate(['/instances/add']);
  }

  get blankState(): BlankState {
    return this.searchTerm
      ? BlankState.EmptyGenericSearch
      : BlankState.EmptyInstanceList;
  }
}
