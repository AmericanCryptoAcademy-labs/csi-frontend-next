import { ethers } from "ethers";

// Extend the Window Interface to include the ethereum property 
interface CustomWindow extends Window{
    ethereum ?:any
}

declare let window : CustomWindow;

interface ProviderAndSigner {
    provider : ethers.providers.Web3Provider;
    signer : ethers.Signer;
    contract : ethers.Contract
}

export const providerAndSigner = async(address : string , abi : any[]) : Promise<ProviderAndSigner> => {
    if (!window.ethereum) {
        alert("Make sure you are using a dApp browser or extension like MetaMask.");
        throw new Error("Ethereum object not found on window. Make sure you are using a dApp browser or extension like MetaMask.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Instantiate the contract with the provided address, ABI, and signer
    const contract = new ethers.Contract(address, abi, signer);

    return { provider, signer, contract };
}