import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import * as SOCIAL from 'src/app/core/constants/socials';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatChipsModule],
})
export class ChipsListComponent {
  @Input() channels = signal<SOCIAL.Social[]>(SOCIAL.list);
  @Input() title: string = 'Canali*';
  @Input() expanded = false;
  @Input() isTouched = signal(false);
  panelOpen: boolean = true;

  onSelect(item: any): void {
    this.isTouched.set(true);
    item.selected = !item.selected;
    this.channels.set(
      this.channels().map((m) => {
        if (m.name === item.name) {
          m.selected = item.selected;
        }
        return m;
      })
    );
  }
}
