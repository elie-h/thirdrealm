import { type ActionFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useRef, useState } from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import FormField from "~/components/FormField";
import { requireUser } from "~/session.server";

const uploader = new Uploader({
  // Get production API keys from Upload.io
  apiKey: "free",
});

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const content = body.get("name");
  const profileImage = body.get("profileImage");
  const about = body.get("about");
  const contractAddresses = body.getAll("contractAddress");
  const networks = body.getAll("network");

  console.log(content, profileImage, about, contractAddresses, networks);

  return null;
};

export default function NewCommunity() {
  const [profileImage, setProfileImage] = useState("");
  const [contractsCount, setContractsCount] = useState(1);

  // We add a ref to the form, so we can reset it later
  let formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mt-6 ">
        <Form
          ref={formRef}
          method="post"
          className="space-y-8  rounded-lg bg-white p-8 shadow-sm "
        >
          <div className="mb-4 flex items-center justify-between border-b  px-4 py-3 sm:px-1">
            <h3 className="font-lg text-xl font-bold leading-6">
              New Community
            </h3>
            <Link
              to={`/home`}
              className="inline-flex items-center rounded-full border border-transparent bg-slate-400 p-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    placeholder="Community name"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                    placeholder="Community description"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Logo
                </label>
                <input
                  type="hidden"
                  value={profileImage}
                  name="profileImage"
                ></input>
                <div className="mt-1 flex items-center">
                  <UploadButton
                    uploader={uploader}
                    options={{
                      multi: false,
                      mimeTypes: ["image/jpeg", "image/png", "image/webp"],
                      maxFileSizeBytes: 2 * 1024 ** 2,
                      showFinishButton: false, // Whether to show the "finish" button in the widget.
                      showRemoveButton: true, // Whether to show the "remove" button next to each file.
                      //   tags: ["space_profile_picture"],
                      editor: {
                        images: {
                          crop: true, // True by default.
                          cropRatio: 1 / 1, // width / height. undefined enables freeform (default).
                          cropShape: "rect", // "rect" (default) or "circ".
                        },
                      },
                    }}
                    onComplete={(files) =>
                      setProfileImage(files[0] ? files[0].fileUrl : "")
                    }
                  >
                    {({ onClick }) => (
                      <span
                        className="h-24 w-24 cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                        onClick={onClick}
                      >
                        {profileImage ? (
                          <img src={profileImage} alt="" />
                        ) : (
                          <div>
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
                      </span>
                    )}
                  </UploadButton>
                </div>
              </div>
            </div>
            <FormField label="Contracts">
              <ul>
                {Array(contractsCount)
                  .fill(0)
                  .map((_, index) => (
                    <li className="my-5 rounded-lg bg-gray-100 p-3" key={index}>
                      <div className="flex flex-wrap space-y-2 md:flex-nowrap md:space-x-2 md:space-y-0">
                        <FormField
                          label="Contract Address"
                          className="flex-1"
                          // error={errors?.projects?.[index].name}
                        >
                          <input
                            className="rounded"
                            type="text"
                            name={"contractAddress"}
                            required
                          />
                        </FormField>
                        <FormField
                          label="Network"
                          className="w-full md:w-1/4"
                          // error={errors?.projects?.[index].date}
                        >
                          <select
                            id="network"
                            name="network"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          >
                            <option value="ethereum">Ethereum</option>
                            <option value="polygon">Polygon</option>
                          </select>
                        </FormField>
                      </div>
                    </li>
                  ))}
                <li>
                  <div className="mt-5 flex space-x-2">
                    <button
                      className="flex-1 rounded bg-gray-200 p-1"
                      type="button"
                      onClick={() => setContractsCount(contractsCount + 1)}
                    >
                      +
                    </button>
                    {contractsCount > 1 ? (
                      <button
                        className="flex-1 rounded bg-red-200 p-1"
                        type="button"
                        onClick={() => setContractsCount(contractsCount - 1)}
                      >
                        -
                      </button>
                    ) : null}
                  </div>
                </li>
              </ul>
            </FormField>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link
                to={`/home`}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
