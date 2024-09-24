import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PackageService } from 'src/app/core/services/package/package.service';
import { PackageModel } from 'src/app/core/models/package/package.model';
import { Router } from '@angular/router';
import { BlankState } from 'src/app/core/enums/blank-state';
import Utils from 'src/app/core/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/shared/snackbar/snackbar.component';
import { MatSort, Sort } from '@angular/material/sort';
import { ModuleModel } from 'src/app/core/models/module/module.model';
import { FunctionModel } from 'src/app/core/models/function/function.model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'components', 'clients', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  searchTerm: string = '';
  items = signal<PackageModel[]>([]);
  dataSource = new MatTableDataSource<any>(this.items());
  maxComponents = 8;

  constructor(
    private _packageService: PackageService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.getPackages();
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.maxComponents = 2;
      } else if (window.innerWidth < 1024) {
        this.maxComponents = 4;
      } else if (window.innerWidth < 1280) {
        this.maxComponents = 6;
      } else {
        this.maxComponents = 8;
      }
    });
  }

  getPackages() {
    this._packageService.getPackages().subscribe({
      next: (data) => {
        this.items = signal<PackageModel[]>(data);
        Utils.sortPackagesByCreatAt(this.items);
        this.dataSource = new MatTableDataSource<any>(this.items());
      },
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante il recupero dei pacchetti',
            type: 'danger',
          },
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  sortChange(sortState: Sort) {
    this.dataSource.sort = this.sort;
  }

  onSearch() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  getNames(items: any[] = []) {
    if (!items) {
      return '';
    }
    return items.map((item) => item.name).join(', ');
  }

  setClientNumber(items: any[] = []) {
    return items.length;
  }

  getSocialsNames(items: string[] = []) {
    return Utils.getChannelsNamesMaxItems(items,8);
  }

  getComponentsNames(channels: string[] = [], modules: ModuleModel = {}, functions: FunctionModel = {}) {
    const componentsModules = Object.keys(modules).filter((key) => modules[key]);
    const componentsFunctions = Object.keys(functions).filter((key) => functions[key]);
    const components = [...channels, ...componentsModules, ...componentsFunctions];
    return Utils.getComponentsNamesMaxItems(components, this.maxComponents);
  }

  getOtherComponentsNames(channels: string[] = [], modules: ModuleModel = {}, functions: FunctionModel = {}) {
    const componentsModules = Object.keys(modules).filter((key) => modules[key]);
    const componentsFunctions = Object.keys(functions).filter((key) => functions[key]);
    const components = [...channels, ...componentsModules, ...componentsFunctions];
    return Utils.getOtherComponentsNamesMaxItems(components, this.maxComponents);
  }

  onAdd() {
    this._router.navigate(['/packages/add']);
  }

  get blankState(): BlankState {
    return this.searchTerm
      ? BlankState.EmptyGenericSearch
      : BlankState.EmptyPackageList;
  }
}
