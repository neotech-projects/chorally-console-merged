import { Component, OnInit, Input } from '@angular/core';
import { BrandwatchLinkServiceService } from '../../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-links-for-client',
  templateUrl: './list-for-client.component.html',
  styleUrls: ['./list-for-client.component.scss']
})
export class ListForClientComponent implements OnInit {
  
  @Input() clientName: string = '';

  onEdit = false;
  showActions = true;

  listAll: any[] = [];
  listAllOriginal: any[] = [];  // Aggiunta della copia della lista originale

  listQueriesLinks: any[] = [];

  displayedColumns: string[] = ['progetto', 'query', 'stato'];


  constructor(    
    private bwLinkServiceService: BrandwatchLinkServiceService,
  ) { }  

  async ngOnInit(): Promise<void> {
    console.log('ListForClientComponent component loading ...', this.clientName); 
    await this.getListAllLinks();
  }   
  public async getListAllLinks(): Promise<void> {
    //if(this.clientName == "") return;
    try {
      const response = await lastValueFrom(this.bwLinkServiceService.getListaAllLinks());
      console.log('Risposta dall\'API BrandwatchLinkServiceService getListAllLinks():', response);

      if (response.status === 'OK' && Array.isArray(response.response)) {
        this.listAllOriginal = response.response; // Conserva l'originale
        this.listAll = this.listAllOriginal.filter(item => item.nomeCliente == this.clientName.toLowerCase());
        console.log

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

  onModify()
  {
    this.onEdit = !this.onEdit;
    
    if(!this.onEdit){
      this.getListAllLinks();
    } 
  }


}
