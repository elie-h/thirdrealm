import { useFetcher, useParams } from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
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
    </div>
  );
}
