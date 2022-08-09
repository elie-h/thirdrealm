import { json, LoaderFunction, type ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { z } from "zod";
import { updateProfile } from "~/models/wallet.server";
import { requireUser } from "~/session.server";

const uploader = new Uploader({
  // Get production API keys from Upload.io
  apiKey: "free",
});

// This type infer errors from a ZodType, as produced by `flatten()` of a parsed schema.
type inferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in keyof z.infer<T>]?: U[];
  };
};

const ProfileFields = z.object({
  name: z.string().min(1).max(30),
  bio: z.string().min(1).max(140),
  image: z.string().optional(),
});

type ProfileFieldsSchema = z.infer<typeof ProfileFields>;
type ProfileFieldsErrors = inferSafeParseErrors<typeof ProfileFields>;

type ActionData = {
  fields: ProfileFieldsSchema;
  errors?: ProfileFieldsErrors;
};

type LoaderData = {
  fields: ProfileFieldsSchema;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const wallet = await requireUser(request);
  const fields = Object.fromEntries(
    await request.formData()
  ) as ProfileFieldsSchema;
  const validationResult = ProfileFields.safeParse(fields);
  if (!validationResult.success) {
    return badRequest({
      fields,
      errors: validationResult.error.flatten(),
    });
  }
  console.log(fields.image);
  await updateProfile(wallet.address, fields.name, fields.bio, fields.image);
  return json({ fields });
};

export const loader: LoaderFunction = async ({ request }) => {
  const wallet = await requireUser(request);

  const fields = {
    name: wallet.name,
    bio: wallet.bio,
    image: wallet.image,
  } as ProfileFieldsSchema;
  return json({ fields });
};

export default function Profile() {
  const [profileImage, setProfileImage] = useState("");
  const actionData = useActionData<ActionData>();
  const loaderData = useLoaderData<LoaderData>();

  useEffect(() => {
    if (loaderData.fields.image) {
      setProfileImage(loaderData.fields.image);
    }
  });

  return (
    <div>
      <Form
        method="post"
        className="space-y-8 rounded-lg bg-white p-8 shadow-sm"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={
                        actionData
                          ? actionData.fields.name
                          : loaderData
                          ? loaderData.fields.name
                          : ""
                      }
                      key={actionData?.fields.name}
                      className={`${
                        actionData?.errors?.fieldErrors.name
                          ? "border-red-300"
                          : "border-gray-300"
                      } block w-full max-w-lg rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                    />
                  </div>
                  <span className="text-sm text-red-500">
                    {actionData?.errors?.fieldErrors.name}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  About
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className={`${
                      actionData?.errors?.fieldErrors.bio
                        ? "border-red-300"
                        : "border-gray-300"
                    } block w-full max-w-lg rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                    defaultValue={
                      actionData
                        ? actionData.fields.bio
                        : loaderData
                        ? loaderData.fields.bio
                        : ""
                    }
                    key={actionData?.fields.bio}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                  <span className="text-sm text-red-500">
                    {actionData?.errors?.fieldErrors.bio}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <input type="hidden" value={profileImage} name="image" />
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
                            // cropRatio: undefined, // width / height. undefined enables freeform (default).
                            // cropShape: "circ", // "rect" (default) or "circ".
                          },
                        },
                      }}
                      onComplete={(files) =>
                        setProfileImage(files[0] ? files[0].fileUrl : "")
                      }
                    >
                      {({ onClick }) => (
                        <span
                          className="h-24 w-24 cursor-pointer overflow-hidden rounded-full"
                          onClick={onClick}
                        >
                          {profileImage ? (
                            <img src={profileImage} alt="profile_pic" />
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
            </div>
          </div>
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
  );
}
