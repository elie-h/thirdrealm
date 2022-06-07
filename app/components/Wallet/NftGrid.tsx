type Network = "eth" | "polygon" | "unknown";

interface Nft {
  title: string | undefined;
  description: string | undefined;
  coverImg: string | undefined;
  network: Network;
}

interface NftsGridProps extends React.ComponentPropsWithoutRef<"div"> {
  loading: boolean;
  nfts: Nft[];
}

export default function NftGrid({ loading = true, nfts = [] }: NftsGridProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {loading
            ? [...Array(6).keys()].map((i) => (
                <div
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <div className="h-52 animate-pulse rounded-xl bg-gray-200 sm:h-full sm:w-72"></div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-200"></div>
                  </div>
                </div>
              ))
            : nfts.map((nft) => (
                <div
                  key={nft.title}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-w-3 aspect-h-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                      src={nft.coverImg}
                      alt={nft.title}
                      className="h-full w-full object-contain sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <h3 className="text-sm font-medium text-gray-900">
                        {nft.title}
                      </h3>
                      {
                        {
                          eth: (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              ETH
                            </span>
                          ),
                          polygon: (
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                              POLYGON
                            </span>
                          ),
                          unknown: <></>,
                        }[nft.network]
                      }
                    </div>
                    <p className="text-sm text-gray-500">{nft.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
