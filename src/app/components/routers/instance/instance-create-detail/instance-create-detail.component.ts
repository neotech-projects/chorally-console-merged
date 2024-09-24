import { Component, Input, signal } from '@angular/core';
import { InstanceModel } from 'src/app/core/models/instance/instance.model';
import { PackageModel } from 'src/app/core/models/package/package.model';
import Utils from 'src/app/core/utils/utils';

@Component({
  selector: 'app-instance-create-detail',
  templateUrl: './instance-create-detail.component.html',
  styleUrls: ['./instance-create-detail.component.scss']
})
export class InstanceCreateDetailComponent {
  @Input() item = {} as InstanceModel;
  @Input() itemPackage = {} as PackageModel;

  getChannelsNames(items: any = {}) {
    return Utils.getChannelsNames(items);
  }

  getFunctionNames(items: any = {}) {
    return Utils.getFunctionNames(items);
  }

  getModuleNames(items: any = {}) {
    return Utils.getModuleNames(items);
  }

}
