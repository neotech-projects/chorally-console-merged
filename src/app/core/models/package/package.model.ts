import { InstanceModel } from '../instance/instance.model';
import { FunctionModel } from '../function/function.model';
import { ModuleModel } from '../module/module.model';

export class PackageModel {
  id?: string;
  name: string;
  channels: string[];
  clients: InstanceModel[];
  modules: ModuleModel;
  functions: FunctionModel;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  constructor() {
    this.id = '';
    this.name = '';
    this.channels = [];
    this.clients = [];
    this.modules = new ModuleModel();
    this.functions = new FunctionModel();
    this.createdAt = '';
    this.updatedAt = '';
  }
}
