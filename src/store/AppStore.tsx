import { atom } from "jotai";
import { TAPPAtom } from "../types";

export const appAtom = atom<TAPPAtom>({
    address: null,
    isCsiDelegate: false,
    canCreateOrg: false,
    allOrgs: [],
})