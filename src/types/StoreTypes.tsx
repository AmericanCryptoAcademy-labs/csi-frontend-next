import { Address } from 'viem';

export type TAPPAtom = {
  address: Address | null;
  isCsiDelegate: boolean;
  canCreateOrg: boolean;
  allOrgs: any;
  userOrgs?: any;
  selectedOrg?: any;
  userLCerts?: any;
  selectedLCert?: any;
}