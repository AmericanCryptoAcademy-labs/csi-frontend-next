import { TOrg } from "./ContractTypes";

export type  TPrimaryButtonProps = {
  children: React.ReactNode;
};


export type TExistingOrgProps = {
  enumState?: any;
  setEnumState?: any;
  appState?: any;
  setAppState?: any;
}

export type TExistingLCertProps = {
  org: TOrg;
  enumState?: any;
  setEnumState?: any;
  appState?: any;
  setAppState?: any;
}

export type TCreateLCertProps= {
  chosenOrg?: TOrg;
  setCreateLcertState?: any;
}