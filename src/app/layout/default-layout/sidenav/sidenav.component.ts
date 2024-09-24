import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { navbarData, navbarBottomData } from './nav-data';
import { KeycloakService } from 'keycloak-angular';

export type MenuItem = {
  name: string;
  icon: string;
  route?: string;
  action?: () => void;
  children?: MenuItem[];
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  sideNavCollapsed = signal<boolean>(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  @Output() collapsedChange = new EventEmitter<boolean>();

  menuItems = signal<MenuItem[]>(navbarData);

  menuItemsBottom = signal<MenuItem[]>(navbarBottomData);

  logoSize = computed(() => (this.sideNavCollapsed() ? '32px' : '100px'));

  changeCollapsed() {
    this.collapsedChange.emit(!this.sideNavCollapsed());
  }

  constructor(private _keycloakService: KeycloakService) {
    this.menuItemsBottom.set(
      this.menuItemsBottom().map((item) => {
        return {
          ...item,
          action: () => {
            if (item.action && item.name === 'Logout') {
              this.logOut();
            }
          },
        };
      })
    );
  }

  logOut() {
    this._keycloakService.logout();
  }
}
