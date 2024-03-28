import CSIABI  from "./abis/CSIABI.json";
import FactoryABI from "./abis/FactoryABI.json";
import StorageContractABI from "./abis/StorageContractABI.json";

export const Contracts = {
    csi: {
        address: "0xF118DcAcea930A3AA9802683Fd599537E23573ec" as `0x${string}`,
        abi: CSIABI,
    },
    factory: {
        address: "0x9058681bDc78bE2F30348199Bbf804b017EeE7f8",
        abi: FactoryABI,
    },
    storageContract: {
        address: "0xA14D60eA70cE1F3bd0791cE64eA00adB89703E8B",
        abi: StorageContractABI,
    },
}