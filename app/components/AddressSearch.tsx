export default function AddressSearch() {
  return (
    <form method="post" action="/api/search">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        Wallet Address
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {/* <div className="absolute inset-y-0 left-0 flex items-center">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>US</option>
                <option>CA</option>
                <option>EU</option>
              </select>
            </div> */}
        <input
          type="text"
          name="address"
          id="address"
          className="block w-full rounded-md border-gray-300 pl-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0x0000000000000000000"
        />
      </div>
    </form>
  );
}
