import { useFetcher, useParams } from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import NftGrid from "~/components/Wallet/NftGrid";
import WalletHero from "~/components/Wallet/WalletHero";

export default function Wallet() {
  const params = useParams();
  invariant(params.address, "Expected params.address");
  const walletFetcher = useFetcher();
  useEffect(() => {
    walletFetcher.load("/api/wallet?address=" + params.address);
  }, []);

  const walletData = walletFetcher.data;
  const loading =
    walletFetcher.state != "idle" || walletFetcher.data == undefined;

  return (
    <div>
      <WalletHero
        loading={loading}
        address={params.address}
        ens={walletData?.ens}
        nftCount={walletData?.nftCount}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-lg font-medium text-gray-900">
            NFTs
          </span>
        </div>
      </div>
      <NftGrid loading={loading} nfts={walletData?.nfts} />
    </div>
  );
}
