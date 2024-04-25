import CSIABI from "./abis/CSI.json";
import CSIOrganizationABI from "./abis/CSIOrginization.json";
import CertABI from "./abis/LCert.json"
import { TContracts } from "@/types";

export const CSI_DELEGATE_ROLE = "0x2eeba039359ffbb7a4d1e710e57738443adb6f50ace2ec4a6026eec3933d0e79"
export const ORG_ADMIN_ROLE = "0x123b642491709420c2370bb98c4e7de2b1bc05c5f9fd95ac4111e12683553c62";
export const ORG_ISSUER_ROLE = "0xbbc6516c15fa93afdf7aae32d6f349f8e2ed3ebdebac8129e0add6e1cb1dd6c4";

export const Contracts: TContracts = {
  CSI: {
    address: "0x575D094220C00618C3a343C0b104dD23586279db", //Sepolia Testnet
    abi: CSIABI.abi
  },
  CSIOrg: {
    abi: CSIOrganizationABI.abi
  },
  Cert: {
    abi: CertABI.abi
  }
};