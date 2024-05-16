// ipfsUtils.ts
import axios from "axios";
import { ipfsMetadata } from "@/types/commonTypes";

export async function fetchIPFSDataWithAxios(ipnftToken: string[]): Promise<ipfsMetadata[]> {
  const ipfsMetadataArray: ipfsMetadata[] = [];
  
  await Promise.all(ipnftToken.map(async (token) => {
    const url = `https://nftstorage.link/ipfs/${token}/metadata.json`;
    try {
      const response = await axios.get<ipfsMetadata>(url);
      response.data.image = extractIpfsToken(response.data.image);
      ipfsMetadataArray.push(response.data);
      console.log(response.data, " ipfs data for ", token);
    } catch (error) {
      console.error("Failed to fetch data with Axios:", error);
    }
  }));

  console.log(ipfsMetadataArray, "ipfsMetadataArray");
  return ipfsMetadataArray;
}

export function extractIpfsToken(ipfsUrl: string): string {
  const parts = ipfsUrl.split("/");
  return parts[2];
}
