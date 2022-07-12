import { Disclosure } from "@headlessui/react";
import { Link, Outlet, useLocation } from "@remix-run/react";
import User from "~/components/User";
import { type WalletWithMemberships } from "~/types";
import { SpacesDropDown } from "./SpacesDropDown";

interface LayoutProps {
  wallet: WalletWithMemberships;
}

export default function Layout({ wallet }: LayoutProps) {
  const location = useLocation();
  const showSpaceDropdown = location.pathname.startsWith("/space");

  return (
    <div className="h-screen-full">
      <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow-md">
        {({ open }) => (
          <>
            <div className="mx-auto px-5 ">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      )}
                    </Disclosure.Button> */}
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="hidden h-12 w-auto sm:block"
                        src="/logowtext.png"
                        alt="Logo"
                      />
                    </Link>
                    <Link to="/">
                      <img
                        className="block h-8 w-auto sm:hidden"
                        src="/logo.png"
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    <Link
                      to="/home"
                      className="bor inline-flex items-center border-b-2 border-indigo-600 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Home
                    </Link>
                  </div>
                </div>
                {showSpaceDropdown ? (
                  <div className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                    <SpacesDropDown wallet={wallet} />
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User />
                  </div>
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <main className="flex-1 bg-stone-50">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
