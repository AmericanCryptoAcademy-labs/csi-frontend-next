import { defaultWagmiConfig } from "@web3modal/wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { polygonMumbai, polygon } from "viem/chains";

export const projectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

if(!projectId) throw new Error("Please provide your project ID");

const metadata = {
    name: "LCerts",
    description: "",
    url: "https://lcerts.com/",
    icons: ["https://lcerts.com/favicon.ico"],
}

const chains = [polygonMumbai] as const;

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});

