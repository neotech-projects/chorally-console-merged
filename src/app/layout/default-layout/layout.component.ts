import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  collapsed = signal<boolean>(false);

  sidenavWidth = computed(() => this.collapsed() ? '0px' : '200px');

  changeCollapsed() {
    this.collapsed.set(!this.collapsed());
  }

}
