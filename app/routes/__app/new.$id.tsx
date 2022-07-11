import {
  json,
  type LoaderFunction,
  redirect,
  type ActionFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";
import { checkSpaceMembership, getSpaceById } from "~/models/spaces.server";
import { requireUser } from "~/session.server";
import { validatePostContent } from "~/utils/strings";
import { type Space } from "@prisma/client";

type LoaderData = Space;

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "params.id is required");
  const user = await requireUser(request);
  const isAllowed = await checkSpaceMembership(params.id, user.address);
  if (!isAllowed) {
    return redirect(`/spaces/${params.id}/forbidden`);
  }
  const space = await getSpaceById(params.id);
  return json(space);
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const content = body.get("content");

  if (typeof content !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    content: validatePostContent(content),
  };

  const fields = { content };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors: { content: "you have to post something" },
      fields,
    });
  }

  invariant(params.id, "Space ID is required");
  await createPost(content, params.id, user.address);
  return redirect(`/space/${params.id}/feed`);
};

export default function () {
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();
  const params = useParams();
  const [disabled, setDisabled] = useState(true);
  const data = useLoaderData<LoaderData>();

  function handleChange(event: any) {
    setDisabled(!validatePostContent(event?.target?.value));
  }

  function handleSubmit(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className="mt-8 w-full px-4 sm:mx-auto sm:w-3/4">
      <div className="mb-2">
        <Link
          to={`/space/${params.id}/feed`}
          className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
        >
          <span aria-hidden="true">&larr;</span> Feed
        </Link>
      </div>
      <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full"
                src={data.coverImage}
                alt=""
              />
              <h1 className="ml-3 text-2xl font-bold leading-10 text-gray-900 sm:truncate">
                {data.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Form
        method="post"
        className="relative"
        onChange={handleChange}
        onSubmit={(event) => {
          event?.preventDefault();
          handleSubmit(event);
        }}
      >
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="content" className="sr-only">
            Title
          </label>
          <textarea
            rows={5}
            name="content"
            defaultValue={actionData?.fields?.content}
            className="block w-full resize-none border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
            placeholder="Content goes here ..."
            aria-invalid={
              Boolean(actionData?.fieldErrors?.content) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.content ? "content-error" : undefined
            }
          />
          <label htmlFor="content" className="sr-only">
            Content
          </label>

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex"></div>
            <div className="flex-shrink-0">
              <button type="submit" disabled={disabled}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
