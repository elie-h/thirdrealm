import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { truncateEthAddress } from "../../utils";
interface WalletHeroProps extends React.ComponentPropsWithoutRef<"div"> {
  loading: boolean;
  address: string;
  ens: string | undefined;
  nftCount: number;
}

export default function WalletHero({
  loading = true,
  address = "0x0",
  ens = undefined,
  nftCount = 0,
}: WalletHeroProps) {
  return (
    <div>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between px-0 sm:flex-nowrap sm:px-12">
          <div className="ml-4 mt-4 w-full">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex">
                  <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {loading ? (
                    <div className="h-8 bg-gray-200 group-hover:opacity-75">
                      <div className="animate-pulse rounded-xl bg-gray-200"></div>
                    </div>
                  ) : ens ? (
                    ens
                  ) : (
                    truncateEthAddress(address)
                  )}
                </h3>
                {/* <p className="text-sm text-gray-500">
                  <a href="#">@tom_cook</a>
                </p> */}
              </div>
            </div>
          </div>
          <div className="ml-4 mt-4 flex w-full justify-center sm:mt-0 sm:ml-0 sm:w-10 sm:flex-shrink-0 sm:justify-end">
            <div className="flex flex-col items-center">
              <p className=" relative inline-flex items-center text-sm text-gray-700">
                NFTs
              </p>
              <p className=" text-large relative inline-flex items-center text-gray-700">
                {loading ? "..." : nftCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
