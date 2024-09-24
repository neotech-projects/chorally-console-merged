import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, effect, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToolTipIconComponent } from '../../tool-tip-icon/tool-tip-icon.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dynamic-autocomplete-multi',
  templateUrl: './dynamic-autocomplete-multi.component.html',
  styleUrls: ['./dynamic-autocomplete-multi.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToolTipIconComponent,
    MatAutocompleteModule,
    MatIconModule
  ],
})
export class DynamicAutocompleteMultiComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() options!: { value: string; description: string }[];
  @Input() errorMessageRequired: string = 'Questo campo è obbligatorio';
  @Input() isSmall: boolean = false;
  @Input() tooltipHelp: string = '';
  @Input() filteredOptions = signal<{ value: string; description: string }[]>([]);
  @Input() maxStartOptions: number = 6;
  @Input() searchPlaceholder: string = 'Cerca...';
  searchControl = new FormControl();

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl('', Validators.required);
    }
  }

  filteredOptionsComputed = computed(() => {
    return this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!value) {
          // return this.filteredOptions().slice(0, this.maxStartOptions);
          return this.filteredOptions();
        }
        const description = typeof value === 'string' ? value : value?.description;
        return description ? this._filter(description as string) : this.options.slice();
      }),
    );
  });

  displayFn(option: { value: string; description: string }): string {
    return option && option.description ? option.description : '';
  }

  private _filter(description: string): { value: string; description: string }[] {
    const filterValue = description.toLowerCase();

    return this.options.filter(option => option.description.toLowerCase().includes(filterValue));
  }
}
