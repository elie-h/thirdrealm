import { useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const address = formData.get("address");
  return json({ errors: { address: 404 }, values: { address } });
};

export default function SearchPage() {
  const actionData = useActionData();
  console.log(actionData?.values);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <form method="post">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Wallet Address
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="text"
            name="address"
            id="address"
            className="block w-full rounded-md border-gray-300 pl-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0x0000000000000000000"
            defaultValue={actionData?.values.address}
          />
        </div>
        <button type="submit">Submit</button>
        {actionData?.errors.address ? (
          <p style={{ color: "red" }}>BAD</p>
        ) : null}
      </form>
    </div>
  );
}
