import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrandwatchLinkServiceService } from '../../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component'; // Importa il componente di conferma
import { MatDialog } from '@angular/material/dialog';



// Definisco l'interfaccia per il tipo di progetto
interface Project {
  attivo: boolean;
  codiceProgetto: number;
  idCliente: number;
  idProgetto: number;
  nomeCliente: string;
  nomeProgetto: string;
}

@Component({
  selector: 'app-edit-brandwatch-link',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class BrandwatchLinkEditComponent implements OnInit {
  
  @Output() listLinks = new EventEmitter<any[]>(); // notifica Output per emettere 
  @Input() nomeCliente: string  = '';
  @Input() nomeProgetto: string = '';
  @Input() idCliente: number  = 0;
  @Input() idProgetto: number  = 0;
  @Input() codiceProgetto: number  = -1;
  @Input() fromInstanceDetail: boolean = false;


  listQueriesLinks: any[] = [];
  listQueriesProjectsBW: any[] = [];
  listProjectsBW: Project[] = [];
  
  stateProject = new FormControl(false);  // Inizializza con il valore del progetto

  form: FormGroup;
  previousSelectedQueries: any[] = [];
  
  constructor(private route: ActivatedRoute,
    private bwLinkServiceService: BrandwatchLinkServiceService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog, // Iniezione di MatDialog
    private cd: ChangeDetectorRef // Aggiungi questo    
  ) { 
    this.form = this.fb.group({
      queries: new FormControl([])  // Inizializza come array vuoto
    });    
  }

  async ngOnInit(): Promise<void> {

    if(!this.codiceProgetto) this.codiceProgetto = -1;

    console.log("Edit page link queries - codice progetto :", this.codiceProgetto);

    // rileva il codice progetto, se non viene passato le rileva dall'idProgetto richiamando la lista dei progetti
    if(this.codiceProgetto == -1)
    {
      // rileva la lista dei progetti e seleziona il codice dalla lista
      await this.getListProjectsBW();

      // Cerca il progetto corrispondente all'idProgetto e imposta codiceProgetto
      const selectedProject = this.listProjectsBW.find((project: Project) => project.idProgetto === this.idProgetto);

      if (selectedProject) {
        this.codiceProgetto = selectedProject.codiceProgetto;  // Imposta il codiceProgetto corrispondente
        this.stateProject.setValue(selectedProject.attivo ?? false);
        console.log(`Codice progetto rilevato: ${this.codiceProgetto}`);
      } else {
        console.error(`Progetto con idProgetto ${this.idProgetto} non trovato.`);
      }      
      
    }

    // Rileva la lista delle queries disponibili e attende il completamento
    await this.getListaQueries();
    
    // Rileva le associazioni, da eseguire solo dopo che getListaQueries() è completato
    await this.getListaLinkQueries();    

  }
  
  async getListProjectsBW(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaProjectsBW());      
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaProjectsBW:', response);
      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listProjectsBW = response.response;
      } else {
        console.error('La risposta non contiene un array di progetti valido.');
        this.listProjectsBW = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching projects list:', error);
      this.listProjectsBW = [];
    }
  }  

  async getListaQueries(): Promise<void> {
    if(this.codiceProgetto != -1){
      try {
        const response = await lastValueFrom(this.bwLinkServiceService.getListaQueriesProgetto(this.codiceProgetto));
        console.log('Risposta dall\'API BrandwatchLinkServiceService getListaQueriesProgetto('+ this.codiceProgetto +'):', response);
  
        if (response.status === 'OK' && Array.isArray(response.response)) {
          this.listQueriesProjectsBW = response.response;     
        } else {
          console.error('La risposta non contiene un array di queries valido.');
          this.listQueriesProjectsBW = [];
        }
      } catch (error) {
        console.error('Error occurred while fetching queries list:', error);
        this.listQueriesProjectsBW = [];
      }
  
    }
  }  


  onQueriesSelectionChange(event: any) {
    const currentSelectedQueries: number[] = event.value; // Array di ID selezionati attuali
  
    // Trova le selezioni aggiunte e rimosse
    const newlySelected = currentSelectedQueries.filter((query: number) => !this.previousSelectedQueries.includes(query));
    const newlyDeselected = this.previousSelectedQueries.filter((query: number) => !currentSelectedQueries.includes(query));
  
    if(newlySelected.length){
      console.log('Nuove Selezioni:', newlySelected);
    }
    
    if(newlyDeselected.length){
      console.log('Nuove DeSelezioni:', newlyDeselected);
      //this.removeLinkQuery(newlyDeselected);      
    }

    // Aggiorna lo stato precedente
    this.previousSelectedQueries = currentSelectedQueries;
  }  

  async onSubmit(): Promise<void> {
    const queriesControl = this.form.get('queries');
    if (queriesControl) {
      const selectedQueries = queriesControl.value;  // Ottiene l'array di queries selezionate
      console.log('Selected queries:', selectedQueries);
  
      // Aggiorno le queries
      await this.updateLinkQuery(selectedQueries);

      // eseguo il rendering solo se non sono nel dettaglio dell'istanza
      if(!this.fromInstanceDetail) this.router.navigate(['/settings/monitoring']);

      // Aggiorno la lista dei progetti
      await this.getListProjectsBW();

      //aggiorno lo stato del progetto
      //const selectedProject = this.listProjectsBW.find(query => query.codiceProgetto === this.codiceProgetto);
      //this.stateProject.setValue(selectedProject.attivo ?? false);


    } else {
      console.error('Queries control not found.');
    }
  }  

  async updateLinkQuery(queryCodes: any): Promise<void> {
    console.log('Aggiorno queries: ', queryCodes);
        
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.associaClienteQueries(this.idCliente,
                                                                                          this.codiceProgetto.toString(),
                                                                                          queryCodes
                                                                                        ));
      console.log('Risposta dall\'API BrandwatchLinkServiceService associaClienteQueries:', response);

      if (response.status === 'OK') {
        console.log('Query associata');
        // aggiorno la lista delle associazioni
        this.getListaLinkQueries();
      } else {
        console.log('Query NON associata');
      }
    } catch (error) {
      console.error('Error - Query NON associata :', error);
    }    
  }

  public async getListaLinkQueries(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaAssociazioni());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaAssociazioni():', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listQueriesLinks = response.response;

        // popolo la check box
        this.populateCheckboxes();
      } else {
        console.error('La risposta non contiene un array di queries valido.');
        this.listQueriesLinks = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching queries list:', error);
      this.listQueriesLinks = [];
    }
  }     

  async onStatoProgettoChange(event: any) {
    const newState = !event.returnValue;
    console.log('Aggiorno stato progetto : ', this.idProgetto, ' - Nuovo valore: ', newState);

    try {
      const response = await lastValueFrom(this.bwLinkServiceService.setStateProject(this.idProgetto, newState));
      console.log('Risposta dall\'API BrandwatchLinkServiceService setStateProject:', response);

      if (response.status === 'OK') {
        console.log('Stato Progetto cambiato:', newState);
      } else {
        console.log('Stato Progetto NON cambiato! ');
      }
    } catch (error) {
      console.error('Error - Stato Progetto NON cambiato! :', error);
    }    
  }

  populateCheckboxes() {
    // Estrai gli ID delle query da listLinks
    const selectedQueryIds = this.listQueriesLinks.map(link => link.codiceQuery);
    
    // Imposta i valori selezionati nel FormControl
    const queriesControl = this.form.get('queries') as FormControl;
    this.previousSelectedQueries = queriesControl.value; // Salva lo stato attuale
    queriesControl.setValue(selectedQueryIds);    
  }

  async dissociaAll(nomeProgetto: string, nomeCliente: string, idProgetto:number): Promise<void> {
    console.log('Dissocia le associazioni per il progetto :', nomeProgetto);
  
    // Parametrizza il messaggio di conferma
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Sei sicuro di voler rimuovere le associazione per il progetto "${nomeProgetto}"?` }
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
            item.idProgetto == idProgetto && item.nomeCliente == nomeCliente
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

          //await this.getListAllLinks();

        } catch (error) {
          console.error('Errore durante la rimozione delle associazioni:', error);
        }
      }
    });
  }  
}