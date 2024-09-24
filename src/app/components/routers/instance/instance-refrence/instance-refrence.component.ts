import { Component, Input, signal } from '@angular/core';
import { InstanceModel } from 'src/app/core/models/instance/instance.model';

@Component({
  selector: 'app-instance-refrence',
  templateUrl: './instance-refrence.component.html',
  styleUrls: ['./instance-refrence.component.scss'],
})
export class InstanceRefrenceComponent {
  @Input() item = signal<InstanceModel>({} as InstanceModel);
  @Input() showActions = true;
}
