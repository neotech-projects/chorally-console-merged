import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutersRoutingModule } from './routers-routing.module';
import { PackageListComponent } from './package/package-list/package-list.component';
import { PackageAddComponent } from './package/package-add/package-add.component';
import { InstanceListComponent } from './instance/instance-list/instance-list.component';
import { InstanceAddComponent } from './instance/instance-add/instance-add.component';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BlankStateComponent } from '../shared/blank-state/blank-state.component';
import { PackageDetailComponent } from './package/package-detail/package-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusIndicatorComponent } from '../shared/status-indicator/status-indicator.component';
import { InstanceDetailComponent } from './instance/instance-detail/instance-detail.component';
import { SwitchListComponent } from '../shared/switch/switch-list/switch-list.component';
import { ChipsListComponent } from '../shared/chips-list/chips-list.component';
import { DynamicInputComponent } from '../shared/form/dynamic-input/dynamic-input.component';
import { DynamicEmailComponent } from '../shared/form/dynamic-email/dynamic-email.component';
import { DynamicSelectComponent } from '../shared/form/dynamic-select/dynamic-select.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToolTipIconComponent } from '../shared/tool-tip-icon/tool-tip-icon.component';
import { PackageFormComponent } from './package/package-form/package-form.component';
import { DynamicAutocompleteComponent } from '../shared/form/dynamic-autocomplete/dynamic-autocomplete.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PackageSubDetailComponent } from './package/package-sub-detail/package-sub-detail.component';
import { PackageInstanceListComponent } from './package/package-instance-list/package-instance-list.component';
import { InstanceStatusComponent } from './instance/instance-status/instance-status.component';
import { InstanceRefrenceComponent } from './instance/instance-refrence/instance-refrence.component';
import { InstancePackageDetailComponent } from './instance/instance-package-detail/instance-package-detail.component';
import { SwitchComponent } from '../shared/switch/switch/switch.component';
import { DynamicAutocompleteMultiComponent } from '../shared/form/dynamic-autocomplete-multi/dynamic-autocomplete-multi.component';
import { DynamicInputDateComponent } from '../shared/form/dynamic-input-date/dynamic-input-date.component';
import { InstanceCreateDetailComponent } from './instance/instance-create-detail/instance-create-detail.component';
import { ButtonComponent } from '../shared/buttons/button/button.component';
import { BrandwatchLinkComponent } from './brandwatch-link/brandwatch-link.component';
import { BrandwatchLinkListComponent } from './brandwatch-link/list/list.component';
import { BrandwatchLinkAddComponent } from './brandwatch-link/add/add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListAllComponent } from './brandwatch-link/list-all/list-all.component';
import { BrandwatchLinkEditComponent } from './brandwatch-link/edit/edit.component';
import { ListForClientComponent } from './brandwatch-link/list-for-client/list-for-client.component';


@NgModule({
  declarations: [
    PackageListComponent,
    PackageAddComponent,
    PackageDetailComponent,
    InstanceListComponent,
    InstanceAddComponent,
    InstanceDetailComponent,
    PackageFormComponent,
    PackageSubDetailComponent,
    PackageInstanceListComponent,
    InstanceStatusComponent,
    InstanceRefrenceComponent,
    InstancePackageDetailComponent,
    InstanceCreateDetailComponent,
    BrandwatchLinkComponent,
    BrandwatchLinkListComponent,
    BrandwatchLinkAddComponent,
    ListAllComponent,
    BrandwatchLinkEditComponent,
    ListForClientComponent,
  ],
  imports: [
    CommonModule,
    RoutersRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    BlankStateComponent,
    MatCardModule,
    MatTooltipModule,
    StatusIndicatorComponent,
    SwitchListComponent,
    ChipsListComponent,
    DynamicInputComponent,
    DynamicEmailComponent,
    DynamicSelectComponent,
    MatGridListModule,
    ToolTipIconComponent,
    DynamicAutocompleteComponent,
    MatButtonToggleModule,
    SwitchComponent,
    DynamicAutocompleteMultiComponent,
    DynamicInputDateComponent,
    ButtonComponent,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule, 
    MatCheckboxModule
  ],
})
export class RoutersModule {}
