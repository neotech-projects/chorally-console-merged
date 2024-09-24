import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageModel } from 'src/app/core/models/package/package.model';
import { InstanceService } from 'src/app/core/services/instance/instance.service';
import * as SOCIAL from 'src/app/core/constants/socials';
import * as FUNCTIONS from 'src/app/core/constants/functions';
import * as MODULS from 'src/app/core/constants/modules';
import { Operation } from 'src/app/core/enums/operation';
import { PackageService } from 'src/app/core/services/package/package.service';
import Utils from 'src/app/core/utils/utils';
import { InstanceModel } from 'src/app/core/models/instance/instance.model';
import { SnackbarComponent } from 'src/app/components/shared/snackbar/snackbar.component';
import { map, startWith } from 'rxjs/operators';
import { ModuleToggleModel } from 'src/app/core/models/module-toggle/module-toggle.model';
import { FunctionToggleModel } from 'src/app/core/models/function-toggle/function-toggle.model';
import { DynamicDialogComponent } from 'src/app/components/shared/dynamic-dialog/dynamic-dialog.component';
import { PackageDetailComponent } from '../../package/package-detail/package-detail.component';

@Component({
  selector: 'app-instance-package-detail',
  templateUrl: './instance-package-detail.component.html',
  styleUrls: ['./instance-package-detail.component.scss'],
})
export class InstancePackageDetailComponent {
  @Input() item = signal<PackageModel>({} as PackageModel);
  @Input() itemInstance = signal<InstanceModel>({} as InstanceModel);
  channelsControl = new FormControl([]);
  modulesControl = new FormControl([]);
  functionsControl = new FormControl([]);
  packageIdControl = new FormControl('', Validators.required);
  showPackageControl = new FormControl(false);
  onEdit = false;
  options = this._formBuilder.group({
    packageId: this.packageIdControl,
    channels: this.channelsControl,
    modules: this.modulesControl,
    functions: this.functionsControl,
    showPackage: this.showPackageControl,
  });

  channelsList = signal<SOCIAL.Social[]>(SOCIAL.list);
  functionsList = signal<FunctionToggleModel[]>(FUNCTIONS.list);
  modulesList = signal<ModuleToggleModel[]>(MODULS.list);
  operation = Operation;

  itemPackage = signal<PackageModel>({} as PackageModel);
  itemsPackage = signal<PackageModel[]>([]);
  packageList = signal<{ value: any; description: string }[]>([]);
  showPackageForm = false;

  memorizedPackageId = signal('');

  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _instanceService: InstanceService,
    private _packageService: PackageService
  ) {
    this.getPackages();
  }

  ngAfterViewInit() {
    this.packageIdControl.patchValue(this.item().id + '', { emitEvent: false });
    const name = signal(this.item().name);
    Utils.setPackageDetail(name, this.item, this.item(), name);
    this.memorizedPackageId.set(this.item().id + '');
  }

  openPackageDialog() {
    const packageId = this.packageIdControl.value + '';
    const func = () => {};

    this.dialog.open(DynamicDialogComponent, {
      data: {
        title: 'Dati pacchetto',
        component: PackageDetailComponent,
        componentData: { id: packageId, viewInModal: true },
        type: 'warning',
        dissmissButton: 'Chiudi',
        function: () => func(),
      },
    });
  }

  getPackages() {
    this._packageService.getPackages().subscribe({
      next: (data) => {
        if (!data) {
          return;
        }
        this.itemsPackage = signal<PackageModel[]>(data);
        data.forEach((item: PackageModel) => {
          this.packageList.set([
            ...this.packageList(),
            { value: item.id, description: item.name },
          ]);
        });
      },
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante il recupero dei pacchetti',
            type: 'danger',
          },
        });
      },
    });
  }

  changePachage() {
    const item = signal(
      this.itemsPackage().find(
        (item) => item.id === this.packageIdControl.value
      ) || ({} as PackageModel)
    );
    const name = signal(this.item().name);
    Utils.setPackageDetail(name, this.item, item(), name);
    this.itemPackage.set(item());
  }

  assignClientToPackage() {
    this._instanceService
      .assignClientToPackage(
        this.itemInstance().accountId + '',
        this.options.get('packageId')?.value + ''
      )
      .subscribe({
        next: () => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: 'Data di scadenza aggiornata con successo',
              type: 'success',
            },
          });
          this.onUpdate.emit();
          this.onEdit = false;
        },
        error: () => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: 'Errore durante l\'assegnazione del pacchetto',
              type: 'danger',
            },
          });
        },
      });
  }

  updatePackageAndAssignClientToPackage() {
    const params = signal<PackageModel>({} as PackageModel);
    const name = signal(this.itemPackage().name);
    const id = this.itemPackage().id + '';

    Utils.setPackageParams(
      this.channelsList,
      this.functionsList,
      this.modulesList,
      name,
      params,
      id
    );
    this._packageService.updatePackage(params()).subscribe({
      next: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: 'Pacchetto aggiornato', type: 'success' },
        });
        if (this.memorizedPackageId() !== this.itemPackage().id) {
          this.assignClientToPackage();
        } else {
          this.onUpdate.emit();
          this.onEdit = false;
        }
      },
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante l\'assegnazione del pacchetto',
            type: 'danger',
          },
        });
      },
    });
  }

  onOperation(operation: Operation) {
    const showPackage = this.options.get('showPackage')?.value;
    if (showPackage) {
      this.updatePackageAndAssignClientToPackage();
    } else {
      this.assignClientToPackage();
    }
  }

  packageComputed = computed(() => {
    return this.packageIdControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (!value) {
          return {} as PackageModel;
        } else {
          const item = this.itemsPackage().find(
            (item) => item.id === value
          ) as PackageModel;
          const title = signal<string>(item?.name ?? '');
          const name = signal<string>(item?.name ?? '');
          Utils.setPackageDetail(title, this.itemPackage, item, name);
          this.itemPackage.set(item);
          return item;
        }
      })
    );
  });
}
