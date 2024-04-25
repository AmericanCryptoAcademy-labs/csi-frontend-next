import { Address } from 'viem';
import { TOrg } from './ContractTypes';

export type TAPPAtom = {
  address: Address | null;
  isCsiDelegate: boolean;
  canCreateOrg: boolean;
  allOrgs: TOrg[];
  userOrgs?: TOrg[];
  selectedOrg?: TOrg;
  userLCerts?: any;
  selectedLCert?: any;
}