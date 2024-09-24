import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class HasUnsavedChangesGuard implements CanDeactivate<any> {
  constructor(private injector: Injector, private dialog: MatDialog) {}

canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot)
: Observable<boolean> | Promise<boolean> | boolean {
  const formGroup: FormGroup = component?.options;
  const isTouched = component?.isTouched();
  if (formGroup?.touched || isTouched) {
    let confirm = false
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Conferma uscita',
        message: 'Stai per uscire dalla sezione. Le modifiche non salvate andranno perse. Confermi di voler continuare?',
        confirmText: 'Conferma',
        cancelText: 'Annulla',
        dissmissButton: 'Annulla',
        confirmButton: 'Conferma',
        function: () => {
          confirm = true;
        },
      }
    });

    return dialogRef.afterClosed().pipe(
      map((confirmed: boolean) => {
        if (confirmed) {
          formGroup.markAsUntouched();
        }
        return confirm;
      })
    );
  }
  return true;
}
}
