import { ClientState } from '../enums/client-state';
import { InstanceModel } from '../models/instance/instance.model';

export const INSTANCE_LIST_DATA: InstanceModel[] = [
  {
    contractExpiry: '2021-01-01',
    domain: 'www.example.com',
    domainName: 'example1',
    id: 1,
    referenceData: {
      email: 'prova@test.com',
      lastName: 'test',
      name: 'prova',
    },
    serviceDeactivation: {
      firstInterval: 1,
      secondInterval: 2,
    },
    status: ClientState.Step2,
  },
  {
    contractExpiry: '2021-01-01',
    domain: 'www.example.com',
    domainName: 'example2',
    id: 2,
    referenceData: {
      email: 'test@test.com',
      lastName: 'test',
      name: 'test',
    },
    serviceDeactivation: {
      firstInterval: 1,
      secondInterval: 2,
    },
    status: ClientState.Activated,
  },
];
