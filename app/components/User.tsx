import { Menu, Transition } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { Fragment } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useUser } from "~/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function User() {
  const user = useUser();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Jazzicon diameter={36} seed={jsNumberForAddress(user.address)} />
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
