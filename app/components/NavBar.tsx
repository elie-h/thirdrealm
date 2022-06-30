import { Disclosure } from "@headlessui/react";
import User from "~/components/User";
// import { XIcon, MenuIcon } from "@heroicons/react/solid";
import { Link } from "@remix-run/react";

export default function Example() {
  return (
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
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button> */}
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-12 w-auto"
                      src="/logowtext.png"
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
  );
}
