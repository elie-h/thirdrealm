import { json, redirect, type ActionFunction } from "@remix-run/node";
import { Link, useFetcher, useParams } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import PostEdit from "~/components/PostEdit.client";
import { createPost } from "~/models/post.server";
import { requireUser } from "~/session.server";

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
  // Add more validation here
  if (content == null || params.id == undefined) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }
  const jsonContent = JSON.parse(content.toString());

  // const fieldErrors = {
  //   content: isEmptyString(content),
  // };

  // const fields = { content };
  // if (!fieldErrors.content) {
  //   return badRequest({
  //     fieldErrors: { content: "You have to post something" },
  //     fields,
  //   });
  // }

  await createPost(jsonContent, params.id, user.address);
  return redirect(`/space/${params.id}/feed`);
};

export default function () {
  const params = useParams();
  const fetcher = useFetcher();
  function onSubmit(postContent: any) {
    fetcher.submit(
      { content: JSON.stringify(postContent) },
      { method: "post" }
    );
  }

  return (
    <div className="my-4">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <Link to={`/space/${params.id}/feed`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </Link>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Feed</h3>
        </div>
      </div>
      <ClientOnly>
        {() => (
          <PostEdit
            placeholder="Create a post"
            handleSubmit={(postContent: any) => onSubmit(postContent)}
          />
        )}
      </ClientOnly>
    </div>
  );
}
