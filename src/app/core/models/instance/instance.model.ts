import { PackageModel } from "../package/package.model";

export class InstanceModel {
  packageName?: string;
  contractExpiry: string;
  domain?: string;
  domainName: string;
  id?: number;
  accountId?: number;
  referenceData?: {
    email: string;
    lastName: string;
    name: string;
  };
  serviceDeactivation?: {
    firstInterval: number;
    secondInterval: number;
  };
  status?: string;
  package?: PackageModel; 
  
  constructor() {
    this.packageName = '';
    this.contractExpiry = '';
    this.domain = '';
    this.domainName = '';
    this.id = 0;
    this.referenceData = {
      email: '',
      lastName: '',
      name: ''
    };
    this.serviceDeactivation = {
      firstInterval: 0,
      secondInterval: 0
    };
    this.status = '';
  }
}
