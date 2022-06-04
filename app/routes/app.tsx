import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Outlet } from "@remix-run/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "~/components/NavBar";

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "W3B",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <NavBar />
        <Outlet />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
