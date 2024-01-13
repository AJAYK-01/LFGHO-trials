import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { MintNFT } from "./components/Deposit";
import { arbitrum, mainnet, optimism, polygon, polygonMumbai, sepolia } from "viem/chains";
import Profile from "./components/ReadContract";
import { SendTransaction } from "./components/SendTransaction";
import ReadContract from "./components/ReadContract";

const chains = [polygonMumbai, sepolia, mainnet, polygon, optimism, arbitrum];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: chains,

    // Required
    appName: "LFGHO",

    // Optional
    appDescription: "Trying out ConnectKit",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);


const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight" >
        {/* <SendTransaction /> */}
        <MintNFT />
        <ReadContract />
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <ConnectKitButton />
        </div>
      </ConnectKitProvider>
    </WagmiConfig >
  );
};



export default App;