// ipfsUtils.ts
import axios from "axios";
import { ipfsMetadata } from "@/types/commonTypes";

export async function fetchIPFSDataWithAxios(ipnftToken: string[]): Promise<ipfsMetadata[]> {
  let ipfsMetadataArray: ipfsMetadata[] = [];
  
  await Promise.all(ipnftToken.map(async (token) => {
    const url = token;
    try {
      const response = await axios.get<ipfsMetadata>(url);
      console.log(response.data.image, " ipfs data for ", token);
      ipfsMetadataArray.push(response.data);
      // console.log(response.data, " ipfs data for ", token);
    } catch (error) {
      console.error("Failed to fetch data with Axios:", error);
    }
  }));

  console.log(ipfsMetadataArray, "ipfsMetadataArray");
  return ipfsMetadataArray;
}
