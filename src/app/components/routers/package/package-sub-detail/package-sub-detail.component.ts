import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { PackageModel } from 'src/app/core/models/package/package.model';
import Utils from 'src/app/core/utils/utils';

@Component({
  selector: 'app-package-sub-detail',
  templateUrl: './package-sub-detail.component.html',
  styleUrls: ['./package-sub-detail.component.scss'],
})
export class PackageSubDetailComponent {
  @Input() item = signal<PackageModel>({} as PackageModel);
  @Input() showActions = true;
  @Input() fromInstance = false;
  @Input() onEditInstance = false;
  @Input() viewInModal = false;

  @Output() duplicate = new EventEmitter();
  @Output() onClick = new EventEmitter();

  getChannelsNames(items: any = {}) {
    return Utils.getChannelsNames(items);
  }

  getFunctionNames(items: any = {}) {
    return Utils.getFunctionNames(items);
  }

  getModuleNames(items: any = {}) {
    return Utils.getModuleNames(items);
  }

  onDuplicate() {
    this.duplicate.emit();
  }

  onClickEvent() {
    this.onClick.emit();
  }
}
