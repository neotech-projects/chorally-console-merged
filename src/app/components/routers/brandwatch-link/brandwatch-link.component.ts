import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BrandwatchLinkServiceService } from '../../../core/services/brandwatch-link/brandwatch-link-service.service';
import { BrandwatchLinkAddComponent } from './add/add.component';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-brandwatch-link',
  templateUrl: './brandwatch-link.component.html',
  styleUrls: ['./brandwatch-link.component.scss']
})
export class BrandwatchLinkComponent implements OnInit {

  @Input() listQueriesLink: any[] = [];  

  idCliente!: number;
  idProgetto!: number;
  codiceProgetto!: number;
  nomeCliente!: string;
  nomeProgetto!: string;

  @ViewChild('brandwatchLinkAdd') BrandwatchLinkAddComponent!: BrandwatchLinkAddComponent;

  isEdit = false;

  constructor(   
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }  

  ngOnInit(){
    console.log('Link brandwatch component loading ...');
    this.checkRoute();
  }

  handleListLinksUpdate(listLinks: any[]): void {
    this.listQueriesLink = listLinks;
    console.log('Aggiornato listQueriesLink con:', this.listQueriesLink);
  }

  onAssociationRemoved(): void {
    console.log('Associazione rimossa, aggiorno la lista delle query.');
    this.BrandwatchLinkAddComponent.getListaLinkQueries(); // Aggiorna la lista chiamando il metodo nel componente figlio
  }

  checkRoute(): void {
    // Recupera l'url corrente
    const currentUrl = this.router.url;
    
      // Esegui logica specifica per la rotta "add"
    if (currentUrl.includes('edit')) {
      console.log('Route: edit');
      this.isEdit = true;
      // Esegui logica specifica per la rotta "edit"
      // Ottiene i parametri dalla rotta
      const idClienteParam = this.activatedRoute.snapshot.paramMap.get('idCliente');
      const idProgettoParam = this.activatedRoute.snapshot.paramMap.get('idProgetto');
      const codiceProgettoParam = this.activatedRoute.snapshot.paramMap.get('codiceProgetto');
      const nomeClienteParam = this.activatedRoute.snapshot.paramMap.get('nomeCliente');
      const nomeProgettoParam = this.activatedRoute.snapshot.paramMap.get('nomeProgetto');

      // Converte in number e gestisce il caso null
      this.idCliente = idClienteParam !== null ? +idClienteParam : 0;  
      this.idProgetto = idProgettoParam !== null ? +idProgettoParam : 0;
      this.codiceProgetto = codiceProgettoParam !== null ? +codiceProgettoParam : 0;

      // Gestisce il caso null per stringhe
      this.nomeCliente = nomeClienteParam !== null ? nomeClienteParam : '';
      this.nomeProgetto = nomeProgettoParam !== null ? nomeProgettoParam : '';
      
      console.log(`Editing: ${this.nomeCliente} (${this.idCliente}), ${this.nomeProgetto} (${this.idProgetto})`);
    }
    else if (currentUrl.includes('add')) { 
      console.log('Route: add');
    }

  }  
}
