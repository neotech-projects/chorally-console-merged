import { Component, signal } from '@angular/core';
import { InstanceModel } from 'src/app/core/models/instance/instance.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstanceService } from 'src/app/core/services/instance/instance.service';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
import { PackageModel } from 'src/app/core/models/package/package.model';
import { SnackbarComponent } from 'src/app/components/shared/snackbar/snackbar.component';
import { ClientState } from 'src/app/core/enums/client-state';

@Component({
  selector: 'app-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrls: ['./instance-detail.component.scss'],
})
export class InstanceDetailComponent {
  id = '';
  item = signal<InstanceModel>({} as InstanceModel);
  itemPackage = signal<PackageModel>({} as PackageModel);
  clientState = ClientState;
  loading = true;

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _instanceService: InstanceService
  ) {
    this._route.params.subscribe((params) => {
      this.id = params['id'] + '' ?? '';
    });
    this.getInstance();
  }

  getInstance() {
    this._instanceService.getInstance(this.id).subscribe({
      next: (res) => {
        this.item.set(res);
        if (res.package) {
          this.itemPackage.set(res.package);
        }
        this.loading = false;
      },
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante il recupero dell\'istanza',
            type: 'danger',
          },
        });
      },
    });
  }

  delete() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Elimina istanza',
        message: `Sei sicuro di voler eliminare l'istanza ${
          this.item().domainName
        }?`,
        type: 'danger',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          this._instanceService.deleteInstance(this.id).subscribe({
            next: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: 5 * 1000,
                data: {
                  message: 'Istanza eliminata con successo',
                  type: 'success',
                },
              });
              this._router.navigate(['/instances']);
            },
            error: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Errore durante l'eliminazione dell'istanza",
                  type: 'danger',
                },
              });
            },
          });
        },
      },
    });
  }

  activate() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Attiva istanza',
        message: `Sei sicuro di voler attivare l'istanza ${
          this.item().domainName
        }?`,
        type: 'success',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          this._instanceService.activateInstance(this.id).subscribe({
            next: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: 5 * 1000,
                data: {
                  message: 'Istanza attivata con successo',
                  type: 'success',
                },
              });
              this.getInstance();
            },
            error: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Errore durante l'attivazione dell'istanza",
                  type: 'danger',
                },
              });
            },
          });
        },
      },
    });
  }

  pause() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Sospendi istanza',
        message: `Sei sicuro di voler sospendere l'istanza ${
          this.item().domainName
        }?`,
        type: 'warning',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          this._instanceService.pauseInstance(this.id).subscribe({
            next: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: 5 * 1000,
                data: {
                  message: 'Istanza sospesa con successo',
                  type: 'success',
                },
              });
              this.getInstance();
            },
            error: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Errore durante la sospensione dell'istanza",
                  type: 'danger',
                },
              });
            },
          });
        },
      },
    });
  }

  outLink(host: string | undefined) {
    window.open(`http://${host}`, '_blank');
  }
}
