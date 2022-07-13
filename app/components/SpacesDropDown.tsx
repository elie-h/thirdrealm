import { Listbox, Transition } from "@headlessui/react";
import { type Space } from "@prisma/client";
import { useNavigate, useParams } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { type WalletWithMemberships } from "~/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SpacesDropDownProps {
  wallet: WalletWithMemberships;
}

export function SpacesDropDown({ wallet }: SpacesDropDownProps) {
  const params = useParams();
  const navigate = useNavigate();
  const currentSpaceIdx = wallet.memberships.findIndex(
    (x) => x.space.id === params.id
  );
  const [selected, setSelected] = useState<Space>(
    wallet.memberships[currentSpaceIdx].space
  );

  useEffect(
    () => setSelected(wallet.memberships[currentSpaceIdx].space),
    [currentSpaceIdx]
  );

  function handleChange(x: Space) {
    navigate(`/space/${x.id}/feed`);
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="sm:text-md relative w-full cursor-default bg-white pl-3 pr-10 text-left text-xs">
              <span className="flex items-center">
                <img
                  src={selected.coverImage}
                  alt=""
                  className="h-8 w-8 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate text-sm">
                  {selected.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
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
                        {/* <Link to={`/space/${membership.space.id}/feed`}> */}
                        <div className="flex items-center">
                          <img
                            src={membership.space.coverImage}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {membership.space.name}
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
                        {/* </Link> */}
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
