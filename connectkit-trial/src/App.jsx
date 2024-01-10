import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import MyComponent from "./components/Info";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

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
        <MyComponent />
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <ConnectKitButton />
        </div>
      </ConnectKitProvider>
    </WagmiConfig >
  );
};



export default App;