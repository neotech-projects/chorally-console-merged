import { Component, Input, signal } from '@angular/core';
import { PackageModel } from 'src/app/core/models/package/package.model';

@Component({
  selector: 'app-package-instance-list',
  templateUrl: './package-instance-list.component.html',
  styleUrls: ['./package-instance-list.component.scss']
})
export class PackageInstanceListComponent {
  
  @Input() item = signal<PackageModel>({} as PackageModel);

}
