import { Component, Input, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageModel } from 'src/app/core/models/package/package.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/shared/snackbar/snackbar.component';
import { PackageService } from 'src/app/core/services/package/package.service';
import Utils from 'src/app/core/utils/utils';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
})
export class PackageDetailComponent {
  @Input() id = '';
  @Input() viewInModal = false;
  item = signal<PackageModel>({} as PackageModel);

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _packageService: PackageService
  ) {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id + '';
      }
    });
  }

  ngAfterViewInit() {
    this._packageService.getPackage(this.id).subscribe({
      next: (data) => (this.item = signal<PackageModel>(data)),
      error: () => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: 'Errore durante il recupero del pacchetto',
            type: 'danger',
          },
        });
      },
    });
  }

  duplicate() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Duplica pacchetto',
        message: `Sei sicuro di voler duplicare il pacchetto ${
          this.item().name
        }?`,
        type: 'warning',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          const newPackage = {
            ...this.item(),
            name: `Copia di ${this.item().name}`,
          };
          this._packageService.addPackage(newPackage).subscribe({
            next: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: 5 * 1000,
                data: {
                  message: 'Pacchetto duplicato correttamente',
                  type: 'success',
                },
              });
              this._router.navigate(['/packages']);
            },
            error: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: 'Errore durante la duplicazione del pacchetto',
                  type: 'danger',
                },
              });
            },
          });
        },
      },
    });
  }

  delete() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Elimina pacchetto',
        message: `Sei sicuro di voler eliminare il pacchetto ${
          this.item().name
        }?`,
        type: 'danger',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          this._packageService.deletePackage(this.id).subscribe({
            next: () => this._router.navigate(['/packages']),
            error: () => {
              this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Errore durante l'eliminazione del pacchetto",
                  type: 'danger',
                },
              });
            },
          });
        },
      },
    });
  }
}
