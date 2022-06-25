import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Link, Outlet } from "@remix-run/react";
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

export function ErrorBoundary({ error }: { error: Error }) {
  if (process.env.NODE_ENV === "development") {
    console.log(error.stack);
  }
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <NavBar />
        <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-center">
              <a href="/" className="inline-flex">
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                  error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Something went wrong!
                </h1>
                <p className="mt-2 text-base text-gray-500">{error.message}</p>
                <p className="mt-2 text-base text-gray-500">{error.stack}</p>
                {process.env.NODE_ENV === "development" ? (
                  <p className="mt-2 text-base text-gray-500">{error.stack}</p>
                ) : null}
                <div className="mt-6">
                  <Link
                    to="/spaces"
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Spaces<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
