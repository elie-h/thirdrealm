import { useActionData, Form, useTransition } from "@remix-run/react";

export default function AddressSearch() {
  const actionData = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <label
        htmlFor="address"
        className="block text-lg font-medium text-gray-700"
      >
        Wallet Address
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="address"
          id="address"
          className="block w-full
          rounded-md border-gray-300 pl-4 text-2xl invalid:border-pink-500 invalid:text-pink-600 focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          placeholder="0x0000000000000000000"
          defaultValue={actionData?.values.address}
          disabled={transition.state === "submitting"}
          required
        />
      </div>
      <div className="flex w-full justify-center">
        <button
          className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          {transition.state === "submitting" ? "Searching..." : "Go"}
        </button>
      </div>
      {actionData?.errors.address && transition.state != "submitting" ? (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0"></div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Invalid wallet address
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>Only Ethereum and Polygon addresses are supported!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Form>
  );
}
