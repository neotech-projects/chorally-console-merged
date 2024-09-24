import { Component, ComponentFactoryResolver, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class DynamicDialogComponent {
  @ViewChild('dynamicContent', { read: ViewContainerRef, static: true }) dynamicContent!: ViewContainerRef;

  constructor(
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
      const componentRef = this.dynamicContent.createComponent<DynamicDialogComponent>(componentFactory as any);
      if (this.data.componentData) {
        Object.assign(componentRef.instance, this.data.componentData);
      }
    }
  }

}
