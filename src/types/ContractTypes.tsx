import { Address } from 'viem';

export type TContracts = {
  CSI: TCSI;
  CSIOrg: TCSIOrg;
  Cert: TCert;
}

export type TCSI = {
  address: Address;
  abi: any;
}

export type TCSIOrg = {
  abi: any;
}

export type TCert = {
  abi: any;
}