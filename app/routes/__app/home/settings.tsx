import { NavLink, Outlet, useLocation, useNavigate } from "@remix-run/react";

const tabs = [
  { name: "Profile", href: "/home/settings/profile" },
  //   { name: "Preferences", href: "/home/settings/preferences", current: false },
  { name: "Wallets", href: "/home/settings/wallets" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const params = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-5">
      <div className="relative border-b border-gray-200 pb-2">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Settings
        </h3>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={(x) => navigate(x.target.value)}
              defaultValue={
                // @ts-ignore
                tabs.find((tab) => tab.href === params.pathname).name
              }
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.href}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <NavLink key={tab.name} to={tab.href}>
                  {({ isActive }) => (
                    <span
                      className={classNames(
                        isActive
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {tab.name}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}
