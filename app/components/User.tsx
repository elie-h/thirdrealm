import { Menu, Transition } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Form } from "@remix-run/react";
import { Fragment, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useSigner } from "wagmi";
import { truncateEthAddress, useOptionalUser } from "~/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function User() {
  const user = useOptionalUser();
  const { data: signer, isError, isLoading } = useSigner();

  useEffect(() => {
    const handleSIWE = async () => {};
    handleSIWE();
  }, [signer, isError, isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex items-center text-sm">
        <Jazzicon
          diameter={36}
          seed={jsNumberForAddress(
            "0x0000000000000000000000000000000000000000"
          )}
        />
        <p className="hidden pl-4 text-sm text-gray-500 sm:block">
          {truncateEthAddress("0x0000000000000000000000000000000000000000")}
        </p>
      </div>
    );
  }

  if (!user && !signer) {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      className="rounded bg-green-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  } else if (signer && !user) {
    return (
      <button
        // onClick={handleSubmit}
        className="block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-center text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
      >
        SIWE
      </button>
    );
  } else if (user) {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex items-center text-sm">
            <span className="sr-only">Open user menu</span>
            <Jazzicon diameter={36} seed={jsNumberForAddress(user.address)} />
            <p className="hidden pl-4 text-sm text-gray-500 sm:block">
              {truncateEthAddress(user.address)}
            </p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block w-full px-4 py-2 text-left text-sm text-gray-700"
                  )}
                >
                  Profile
                </button>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <Form action="/siwe/logout" method="post">
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-left text-sm text-gray-700"
                    )}
                  >
                    Logout
                  </button>
                </Form>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
  return <p></p>;
}
