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

export type TOrg = {
  orgName: string;
  orgDeployer: Address;
  orgAddress: Address;
}

export type TLCert = {
  certName: string;
  certSymbol: string;
  certAddress: Address;
}

// Params for create Org
export type TCreateOrgParams = {
  orgName: string;
  orgAdmins: Address[] | string[];
  orgIssuers: Address[] | string[];
}

// Params for create LCert contract
export type TCreateLCertParams = {
  name: string;
  symbol: string;
  maxSupply: number;
  transferable: boolean;
  revocable: boolean;
  creator: Address;
  issuersForCertificate: Address[] | string[];
}

export type TIssueLCertParams = {
  firstName: string;
  lastName: string;
  certName: string;
  remarks: string,
  issuedTo: string,
  orgName: string,
  description: string,
  dateIssued: string,
  dateExpired: string,
}

export type TIssueLCertContractParams = {
  to: Address;
  tokenURI: string;
  expInDays: number;
}
