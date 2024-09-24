import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs/internal/Observable';
import { BlankState } from 'src/app/core/enums/blank-state';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-blank-state',
  templateUrl: './blank-state.component.html',
  styleUrls: ['./blank-state.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class BlankStateComponent implements OnChanges {
  @Input() blankState?: BlankState;

  @Input() message = 'Ci dispiace, nessun risultato è stato trovato';
  @Input() image = 'assets/images/empty-states/Empty-states-search-generica.svg';
  @Input() description = `Prova con un'altra parola chiave`;
  @Input() button = '';

  @Output() buttonClick = new EventEmitter<void>();

  
  isLoading: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.isLoading;
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blankState']) {
      this.init();
    }
  }

  init(): void {
    if (!this.blankState) {
      return;
    }
    switch (this.blankState) {
      // search generic
      case BlankState.EmptyGenericSearch:
        this.message = 'Ci dispiace, nessun risultato è stato trovato';
        this.image =
          'assets/images/empty-states/Empty-states-search-generica.svg';
        this.description = `Prova con un'altra parola chiave`;
        this.button = '';
        break;
      case BlankState.EmptyFilesArchived:
        this.message = 'Nessun file è stato ancora archiviato';
        this.image = 'assets/images/empty-states/Empty-states-archivio.svg';
        this.description = `Per iniziare ad utilizzare la ricerca, aspetta che vengano importati i messaggi`;
        this.button = '';
        break;
      //canali
      case BlankState.EmptyChanelsList:
        this.message = `Nessun canale è stato ancora configurato`;
        this.image = 'assets/images/empty-states/Empty-states-sources.svg';
        this.description = `Clicca su “collega” o sul bottone “+” in alto a destra per configurarne uno`;
        this.button = 'Collega';
        break;
      //campi personalizzati
      case BlankState.EmptyCustomization:
        this.message = `Nessun campo personalizzato è stato ancora creato`;
        this.image = 'assets/images/empty-states/Empty-states-CF.svg';
        this.description = `Clicca su “crea” o sul bottone “+” in alto a destra per configurarne uno.`;
        this.button = 'Crea';
        break;
      //package  
      case BlankState.EmptyPackageList:
        this.message = `Nessun pacchetto è stato ancora creato`;
        this.image = 'assets/images/empty-states/Empty-states-inbox.svg';
        this.description = `Clicca su “crea” o sul bottone “+” in alto a destra per configurarne uno.`;
        this.button = 'Crea';
        break;
      //istanze
      case BlankState.EmptyInstanceList:
        this.message = `Nessuna istanza è stata ancora configurata`;
        this.image = 'assets/images/empty-states/Empty-states-istanze.svg';
        this.description = `Clicca su “crea” o sul bottone “+” in alto a destra per configurarne una.`;
        this.button = 'Crea';
        break;

      default:
        this.message = 'No data available';
        this.image = 'assets/images/empty-states/Empty-state-agents.svg';
        this.description = 'No data available';
        this.button = 'Add new';
        break;
    }
  }
}
