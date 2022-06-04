import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { truncateEthAddress } from "../../utils";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
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
      <div className="h-32 w-full bg-gradient-to-r from-green-400 to-blue-500 object-cover lg:h-48"></div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Jazzicon diameter={140} seed={jsNumberForAddress(address)} />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {loading ? "....." : ens ? ens : truncateEthAddress(address)}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {loading ? "....." : ens ? ens : truncateEthAddress(address)}
          </h1>
        </div>
      </div>
    </div>
  );
}
