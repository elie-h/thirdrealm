import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Outlet } from "@remix-run/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "~/components/NavBar";
import { ApolloProvider } from "@apollo/client";
import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { initApollo } from "~/context/apollo";

const client = initApollo(false);

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
        <ApolloProvider client={client}>
          <NavBar />
          <Outlet />
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
