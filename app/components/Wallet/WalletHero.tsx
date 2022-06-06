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
      <div className="h-24 w-full bg-[#1da1f2] object-cover lg:h-32"></div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="sm:-mt-18 -mt-12  sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {loading ? (
                  <div className="aspect-w-1 h-8 bg-gray-200 group-hover:opacity-75">
                    <div className="animate-pulse rounded-xl bg-gray-200"></div>
                  </div>
                ) : ens ? (
                  ens
                ) : (
                  truncateEthAddress(address)
                )}
              </h1>
            </div>
            <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="ml-4 flex flex-auto flex-col-reverse">
                <h3 className="inline-flex justify-center  font-medium text-gray-900">
                  NFTs
                </h3>
                <p className="inline-flex justify-center  text-sm text-gray-500">
                  {loading ? (
                    <div className="aspect-w-1 h-8 bg-gray-200 group-hover:opacity-75">
                      <div className="animate-pulse rounded-xl bg-gray-200"></div>
                    </div>
                  ) : (
                    nftCount
                  )}
                </p>
              </div>
              {/* <div className="ml-4 flex flex-auto flex-col-reverse">
                <h3 className="inline-flex justify-center  font-medium text-gray-900">
                  NFTs
                </h3>
                <p className="inline-flex justify-center  text-sm text-gray-500">
                  20
                </p>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{ens}</h1>
        </div> */}
      </div>
    </div>
  );
}
