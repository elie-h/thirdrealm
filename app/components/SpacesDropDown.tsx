import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { type WalletWithMemberships } from "~/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SpacesDropDownProps {
  wallet: WalletWithMemberships;
}

export function SpacesDropDown({ wallet }: SpacesDropDownProps) {
  const [selected, setSelected] = useState(wallet.memberships[0].space);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default bg-white  pl-3 pr-10 text-left">
              <span className="flex items-center">
                <img
                  src={selected.collection.coverImage}
                  alt=""
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">
                  {selected.collection.name}
                </span>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {wallet.memberships.map((membership) => (
                  <Listbox.Option
                    key={membership.space.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={membership.space}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={membership.space.collection.coverImage}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {membership.space.collection.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
