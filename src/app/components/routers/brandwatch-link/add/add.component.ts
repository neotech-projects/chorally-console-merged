import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { BrandwatchLinkServiceService } from '../../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-brandwatch-link',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class BrandwatchLinkAddComponent implements OnInit {
  
  @Output() listLinks = new EventEmitter<any[]>(); // Output per emettere listQueriesProjectsBW    
  listClients: any[] = [];
  listProjectsBW: any[] = [];
  listProjectsBWClient : any[] = [];
  clienteFromInstance: string = '';
  
  listQueriesLinks: any[] = [];
  listQueriesProjectsBW: any[] = [];
  
  selectedClient = -1;
  selectedProjectCode : number = -1;
  selectedProjectID : number = -1;
  stateProject = new FormControl(false);  // Inizializza con il valore del progetto

  form: FormGroup;
  previousSelectedQueries: any[] = [];

  constructor(    
    private bwLinkServiceService: BrandwatchLinkServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef // Aggiungi questo
  ) { 
    this.form = this.fb.group({
      queries: new FormControl([])  // Inizializza come array vuoto
    });
  }
  
  async ngOnInit(): Promise<void> {
    console.log('Add link component loading ...');

    // Richiamo la lista dei clienti
    await this.getListClients();

    // Recupera il parametro dall'URL
    this.route.paramMap.subscribe(params => {
      this.clienteFromInstance = params.get('clienteFromInstance') || '';

      // se richamo il componente dal dettaglio del cliente inizializzo i dati
      if (this.clienteFromInstance) {
        console.log('Parametro clienteFromInstance:', this.clienteFromInstance);

        const selectedClientItem = this.listClients.find(query => query.nomeCliente === this.clienteFromInstance);
    
        this.selectedClient = selectedClientItem.idCliente;
          
        // Chiama manualmente il metodo per gestire la selezione del cliente
        this.onClientSelected(this.selectedClient);      
      }
    });    

  }

  async onClientSelected(idCliente: number): Promise<void> {
    this.selectedClient = idCliente;
    console.log('Codice cliente selezionato:', this.selectedClient);
    const selectedClientName = this.listClients.find(query => query.idCliente === idCliente);
    console.log('Nome cliente selezionato:', selectedClientName?.nomeCliente);
  
    // Richiamo la lista dei progetti Brandwatch
    await this.getListProjectsBW();

    // Filtra la lista dei progetti per il cliente selezionato
    this.listProjectsBWClient = this.listProjectsBW.filter(query => query.idCliente === idCliente);
  
    console.log('Progetti BW per il cliente selezionato: ', this.listProjectsBWClient);
  
    // Reset del progetto selezionato e delle queries se il cliente cambia
    this.selectedProjectCode = -1;
    this.listQueriesProjectsBW = [];
    
    // Rileva la lista delle queries disponibili e attende il completamento
    //await this.getListaQueries();
    
    // Rileva le associazioni, da eseguire solo dopo che getListaQueries() è completato
    //await this.getListaLinkQueries();    
  }

  async onProjectBWSelected(projectCode: number): Promise<void> {
    this.selectedProjectCode = projectCode;
    console.log('Codice progetto selezionato:', this.selectedProjectCode);
    
    const selectedProject = this.listProjectsBW.find(query => query.codiceProgetto === projectCode);

    if (selectedProject) {
        // Aggiorna lo stato del progetto
        this.stateProject.setValue(selectedProject.attivo ?? false);
        this.cd.detectChanges(); // Forza l'aggiornamento della vista
        this.selectedProjectID = selectedProject.idProgetto;

        console.log('Stato progetto selezionato:', this.stateProject.value);
        console.log('ID progetto selezionato:', this.selectedProjectID);

        // Rileva la lista delle queries disponibili e attende il completamento
        await this.getListaQueries();

        // Rileva le associazioni, da eseguire solo dopo che getListaQueries() è completato
        await this.getListaLinkQueries();
      }
  }

  async getListaQueries(): Promise<void> {
    if(this.selectedProjectCode != -1){
      try {
        const response = await lastValueFrom(this.bwLinkServiceService.getListaQueriesProgetto(this.selectedProjectCode));
        console.log('Risposta dall\'API BrandwatchLinkServiceService getListaQueriesProgetto('+ this.selectedProjectCode +'):', response);
  
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

  public async getListaLinkQueries(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaAssociazioni());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaAssociazioni():', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listQueriesLinks = response.response;

        // Chiama il metodo per aggiornare listLinks in base al cliente selezionato
        this.mergeAllData();

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

  populateCheckboxes() {
    // Estrai gli ID delle query da listLinks
    const selectedQueryIds = this.listQueriesLinks.map(link => link.codiceQuery);
    
    // Imposta i valori selezionati nel FormControl
    const queriesControl = this.form.get('queries') as FormControl;
    this.previousSelectedQueries = queriesControl.value; // Salva lo stato attuale
    queriesControl.setValue(selectedQueryIds);    
  }

  async onSubmit(): Promise<void> {
    const queriesControl = this.form.get('queries');
    if (queriesControl) {
      const selectedQueries = queriesControl.value;  // Ottiene l'array di queries selezionate
      console.log('Selected queries:', selectedQueries);
  
      // Aggiorno le queries
      await this.updateLinkQuery(selectedQueries);

      // Aggiorno la lista dei progetti
      await this.getListProjectsBW();

      //aggiorno lo stato del progetto
      const selectedProject = this.listProjectsBW.find(query => query.codiceProgetto === this.selectedProjectCode);
      this.stateProject.setValue(selectedProject.attivo ?? false);
    } else {
      console.error('Queries control not found.');
    }
  }

  private mergeAllData(): void {
    // Unione degli array
    const listLinks = this.listQueriesLinks
      .map(associazione => {
        const cliente = this.listClients.find(c => c.idCliente === associazione.idClienteAssociazione);
        const progetto = this.listProjectsBW.find(p => p.codiceProgetto === associazione.codiceProgetto);
        const query = this.listQueriesProjectsBW.find(q => q.codiceQuery === associazione.codiceQuery);

        // Se uno degli elementi non corrisponde, ritorna null (o undefined)
        if (!cliente || !progetto || !query) {
          return null;
        }

        return {
          ...associazione,
          nomeCliente: cliente.nomeCliente,
          descCliente: cliente.descCliente || '',
          nomeProgettoReal: progetto.nomeProgetto,
          nomeQuery: query.nomeQuery,
          stato: 'ASSOCIATO'
        };
      })
      .filter(link => link !== null) // Filtra i record che sono null
      .filter(link => link?.idClienteAssociazione === this.selectedClient); // Filtra per client selezionato

    console.log('ALL DATA FILTERED:', listLinks);

    this.listLinks.emit(listLinks); // Emetti l'array quando è valorizzato
  }

  async getListClients(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaClienti());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaClienti:', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listClients = response.response;
      } else {
        console.error('La risposta non contiene un array di clienti valido.');
        this.listClients = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching clients list:', error);
      this.listClients = [];
    }
  }   

  async getListProjectsBW(): Promise<void> {
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaProjectsBW());      
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListaProjectsBW:', response);
      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listProjectsBW = response.response;
        // Aggiorna il valore di idCliente per tutti gli elementi della lista perché attualmente non ritorna dall'endpoint
        this.listProjectsBW.forEach(project => {
          project.idCliente = this.selectedClient;
        });                       
      } else {
        console.error('La risposta non contiene un array di progetti valido.');
        this.listProjectsBW = [];
      }
    } catch (error) {
      console.error('Error occurred while fetching projects list:', error);
      this.listProjectsBW = [];
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

  async updateLinkQuery(queryCodes: any): Promise<void> {
    console.log('Aggiorno queries: ', queryCodes);
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.associaClienteQueries(this.selectedClient,
                                                                                          this.selectedProjectCode.toString(),
                                                                                          queryCodes
                                                                                        ));
      console.log('Risposta dall\'API BrandwatchLinkServiceService associaClienteQueries:', response);

      if (response.status === 'OK') {
        console.log('Query associata');
        // aggiorno la lista delle associazioni
        this.getListaLinkQueries();
        // aggiorno la lista dei progetti per aggiornare lo stato
        this.getListProjectsBW();
        //aggiorno lo stato del progetto
        const selectedProject = this.listProjectsBW.find(query => query.codiceProgetto === this.selectedProjectCode);
        this.stateProject.setValue(selectedProject.attivo ?? false);

      } else {
        console.log('Query NON associata');
      }
    } catch (error) {
      console.error('Error - Query NON associata :', error);
    }    
  }

  async onStatoProgettoChange(event: any) {
    const newState = !event.returnValue;
    console.log('Aggiorno stato progetto : ', this.selectedProjectID, ' - Nuovo valore: ', newState);

    try {
      const response = await lastValueFrom(this.bwLinkServiceService.setStateProject(this.selectedProjectID, newState));
      console.log('Risposta dall\'API BrandwatchLinkServiceService setStateProject:', response);

      if (response.status === 'OK') {
        console.log('Stato Progetto cambiato:', newState);

        // Aggiorno la lista dei progetti
      await this.getListProjectsBW();

      //aggiorno lo stato del progetto
      const selectedProject = this.listProjectsBW.find(query => query.codiceProgetto === this.selectedProjectCode);
      this.stateProject.setValue(selectedProject.attivo ?? false);

      } else {
        console.log('Stato Progetto NON cambiato! ');
      }
    } catch (error) {
      console.error('Error - Stato Progetto NON cambiato! :', error);
    }    
  }

}
