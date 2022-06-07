import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import AddressSearch from "~/components/AddressSearch";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const address = formData.get("address");
  return json({ errors: { address: 404 }, values: { address } });
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <AddressSearch />
    </div>
  );
}
