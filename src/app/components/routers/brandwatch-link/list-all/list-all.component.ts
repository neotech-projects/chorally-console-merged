import { Component, OnInit } from '@angular/core';
import { BrandwatchLinkServiceService } from '../../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { lastValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component'; // Importa il componente di conferma
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-all-links',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit {

  listAll: any[] = [];
  listAllOriginal: any[] = [];  // Aggiunta della copia della lista originale

  listQueriesLinks: any[] = [];

  displayedColumns: string[] = ['cliente', 'progetto', 'query', 'stato', 'action'];
  searchTerm = '';

  constructor(    
    private bwLinkServiceService: BrandwatchLinkServiceService,
    private dialog: MatDialog // Iniezione di MatDialog
  ) { }  

  async ngOnInit(): Promise<void> {
    console.log('List-All component loading ...'); 
    await this.getListAllLinks();
  }    

  // Metodo di ricerca richiamato dalla searchbar
  onSearch(event: Event): void {
    // Estrae il valore dell'input dall'evento
    const searchFilter = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (searchFilter.length > 2) {
      this.searchTerm = searchFilter;
      
      // Filtra la lista listAll basandosi sul termine di ricerca
      this.listAll = this.listAllOriginal.filter(item => 
        item.nomeProgetto.toLowerCase().includes(this.searchTerm) ||
        item.nomeCliente.toLowerCase().includes(this.searchTerm) ||
        item.nomiQueriesProgettoCsv.toLowerCase().includes(this.searchTerm)
      );
  
      console.log('Ricerca: ', searchFilter);
      //console.log('listAll: ', this.listAll);
    } else {
      // Se il termine di ricerca è troppo corto, ripristina la lista originale
      this.listAll = [...this.listAllOriginal];
    }
  }
  

  public async getListAllLinks(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaAllLinks());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListAllLinks():', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listAllOriginal = response.response; // Conserva l'originale
        this.listAll = [...this.listAllOriginal]; // Crea una copia per il filtraggio

      } else {
        console.error('La risposta non contiene un array di associazioni valido.');
        this.listAllOriginal = [];
        this.listAll = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching all links list:', error);
      this.listAllOriginal = [];
      this.listAll = [];
    }
  }  

  async dissociaAll(element: any): Promise<void> {
    console.log('Dissocia le associazioni per il progetto :', element);
  
    // Parametrizza il messaggio di conferma
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Sei sicuro di voler rimuovere le associazione per il progetto "${element.nomeProgetto}"?` }
    });
  
    // Gestisce il risultato del dialog
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        // Se l'utente conferma, procedi con la dissociazione
        try {
          // rilevo le associazioni
          await this.getListaLinkQueries();
  
          //filtro le associazioni per cliente e progetto
          const listToRemove = this.listQueriesLinks.filter(item => 
            item.idProgetto == element.idProgetto && item.nomeCliente == element.nomeCliente
          );
  
          console.log("Rimuovo le associazioni: ", listToRemove);
  
          // Usa un ciclo for...of per gestire le promesse in modo asincrono
          for (const linkToRemove of listToRemove) {
            const response = await lastValueFrom(this.bwLinkServiceService.rimuoviAssociazione(linkToRemove.idAssociazione));
            console.log('Risposta dall\'API BrandwatchLinkServiceService rimuoviAssociazione:', response);
  
            if (response.status === 'OK') {
              console.log('Associazione rimossa!');
            } else {
              console.error('Associazione NON rimossa!');
            }            
          }

          await this.getListAllLinks();

        } catch (error) {
          console.error('Errore durante la rimozione delle associazioni:', error);
        }
      }
    });
  }
  

  public async getListaLinkQueries(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaAssociazioni());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaAssociazioni():', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listQueriesLinks = response.response;

      } else {
        console.error('La risposta non contiene un array di queries valido.');
        this.listQueriesLinks = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching queries list:', error);
      this.listQueriesLinks = [];
    }
  }     

}
