import { useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node"; // or "@remix-run/cloudflare"

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const address = formData.get("address");
//   return json({ errors: 404, value: address });
// };

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return redirect(`/projects/${project.id}`);
};

export default function AddressSearch() {
  const actionData = useActionData();
  return (
    <form method="post" action="/app/search">
      <p>
        <label>
          Name: <input name="name" type="text" />
        </label>
      </p>
      <p>
        <label>
          Description:
          <br />
          <textarea name="description" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
    // <form method="post">
    //   <label
    //     htmlFor="address"
    //     className="block text-sm font-medium text-gray-700"
    //   >
    //     Wallet Address
    //   </label>
    //   <div className="relative mt-1 rounded-md shadow-sm">
    //     <input
    //       type="text"
    //       name="address"
    //       id="address"
    //       className="block w-full rounded-md border-gray-300 pl-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //       placeholder="0x0000000000000000000"
    //       defaultValue={actionData?.values.address}
    //     />
    //   </div>
    //   <button type="submit">Submit</button>
    //   {actionData?.errors.name ? (
    //     <p style={{ color: "red" }}>{actionData.errors.name}</p>
    //   ) : null}
    // </form>
  );
}
