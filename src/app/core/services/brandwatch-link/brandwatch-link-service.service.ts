import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandwatchLinkServiceService {

  //http://ec2-16-170-229-233.eu-north-1.compute.amazonaws.com:5000/swagger-ui/index.html
  private baseUrlBackOffice: string = 'https://api.chorally.com/monitoring/backoffice/api'; // Base URL dell'API 
  private baseUrlFrontOffice: string = 'https://api.chorally.com/monitoring/frontoffice/api'; // Base URL dell'API 
  private listQueriesBWEndpoint = '/getListaQueryBW';
  private listUtenteClienteEndpoint = '/list/queries/utenteCliente';
  private listClientiEndpoint = '/getListaClienti';
  private listProjectsBWEndpoint = '/getListaProjectsBW';
  private addLinkClienteQueriesEndpoint = '/associaClienteQueries';
  private listLinkClientQueriesBW = '/list/associazioni';
  private removeLinkClienteQueriesEndpoint = '/rimuoviAssociazione';
  private setStateProjectEndpoint = '/toggleAttivazioneProgetto';
  private listAllLinks ='/summary/associazioni'

  constructor(private http: HttpClient) { }

  // Metodo per ottenere il valore del cookie
  private getCookie(name: string): string {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
  }

  // Metodo per ottenere l'header di autorizzazione con il token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getCookie('KEYCLOAK_IDENTITY');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin':'http://localhost'
    });
  }  

  // Lista utenti cliente
  getListaUtenteCliente(): Observable<any> {
    const url = `${this.baseUrlFrontOffice}${this.listUtenteClienteEndpoint}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  // Lista clienti
  getListaClienti(): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.listClientiEndpoint}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  // Lista progetti Brandwatch
  getListaProjectsBW(): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.listProjectsBWEndpoint}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }  

  // Metodo per ottenere la lista delle query del progetto con codiceProgettoBW
  getListaQueriesProgetto(codiceProgettoBW: number): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.listQueriesBWEndpoint}/${codiceProgettoBW}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }


  // metodo per associare un cliente ad un progetto BW con delle queries
  associaClienteQueries(idCliente: number, codiceProgettoBW: string, codiciQueryBW: string[], queryType: string = 'MONITOR'): Observable<any> {
    
    const url = `${this.baseUrlBackOffice}${this.addLinkClienteQueriesEndpoint}`;

    if(!codiciQueryBW.length) codiciQueryBW = [""];
    const body = {
      idCliente: idCliente,
      codiceProgettoBW: codiceProgettoBW,
      codiciQueryBW: codiciQueryBW,  // Array di codici queries
      queryType: queryType
    };

    console.log('Richiamo servizio: ', url, body);
    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }  

  // metodo per rimuove un'associazione
  rimuoviAssociazione(idAssociazione: number): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.removeLinkClienteQueriesEndpoint}?idAssociazione=${idAssociazione}`;

    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }  

  // metodo che ritorna la lista delle associazioni
  getListaAssociazioni(): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.listLinkClientQueriesBW}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }  


  // metodo che ritorna la lista di tutte associazioni
  getListaAllLinks(): Observable<any> {
    const url = `${this.baseUrlBackOffice}${this.listAllLinks}`;
    
    // Chiamata HTTP GET con header di autorizzazione
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  } 
  // metodo per attivare / disattivare un progetto
  setStateProject(idProject: number, state: boolean): Observable<any> {
    
    const url = `${this.baseUrlBackOffice}${this.setStateProjectEndpoint}`;

    const body = {
      progettoId: idProject,
      attivo: state
    };

    console.log('Richiamo servizio: ', url, body);
    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }  

}
