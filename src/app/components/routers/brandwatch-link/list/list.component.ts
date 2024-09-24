import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandwatchLinkServiceService } from '../../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { lastValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component'; // Importa il componente di conferma

@Component({
  selector: 'app-list-brandwatch-link',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BrandwatchLinkListComponent implements OnInit {

  @Input() listQueriesLink: any[] = [];
  @Output() associationRemoved = new EventEmitter<void>(); // Emette un evento quando un'associazione viene rimossa

  displayedColumns: string[] = ['cliente', 'progetto', 'query', 'action'];

  constructor(    
    private bwLinkServiceService: BrandwatchLinkServiceService,
    private dialog: MatDialog // Iniezione di MatDialog
  ) { }

  ngOnInit(){
    console.log('List component loading ...');
  }  

  async dissocia(element: any): Promise<void> {
    console.log('Dissocia l\'elemento:', element);

    // Parametrizza il messaggio di conferma
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Sei sicuro di voler rimuovere l'associazione per la query "${element.nomeQuery}"?` }
    });

    // Gestisce il risultato del dialog
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        // Se l'utente conferma, procedi con la dissociazione
        try {
          const response = await lastValueFrom(this.bwLinkServiceService.rimuoviAssociazione(element.idAssociazione));
          console.log('Risposta dall\'API BrandwatchLinkServiceService rimuoviAssociazione:', response);

          if (response.status === 'OK') {
            console.log('Associazione rimossa!');
            this.associationRemoved.emit(); // Emette l'evento quando l'associazione viene rimossa
          } else {
            console.error('Associazione NON rimossa!');
          }
        } catch (error) {
          console.error('Errore durante la rimozione dell\'associazione:', error);
        }
      }
    });
  }  
}
