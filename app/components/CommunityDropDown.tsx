import { Listbox, Transition } from "@headlessui/react";
import { type Community } from "@prisma/client";
import { useNavigate, useParams } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { type WalletWithMemberships } from "~/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CommunityDropDownProps {
  wallet: WalletWithMemberships;
}

export function CommunityDropDown({ wallet }: CommunityDropDownProps) {
  const params = useParams();
  const navigate = useNavigate();
  const currentCommunityIdx = wallet.memberships.findIndex(
    (x) => x.community.id === params.id
  );
  const [selected, setSelected] = useState<Community>(
    wallet.memberships[currentCommunityIdx].community
  );

  useEffect(
    () => setSelected(wallet.memberships[currentCommunityIdx].community),
    [currentCommunityIdx, wallet.memberships]
  );

  function handleChange(x: Community) {
    navigate(`/c/${x.id}/feed`);
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
                    key={membership.community.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={membership.community}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={membership.community.coverImage}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {membership.community.name}
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
