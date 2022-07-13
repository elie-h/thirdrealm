import {
  json,
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import PostCard from "~/components/PostCard";
import PostEdit from "~/components/PostEdit";
import { createPost, getPostsForSpace } from "~/models/post.server";
import { requireUser } from "~/session.server";
import { type PostWithCommentCount } from "~/types";
import { useUser } from "~/utils";
import { validatePostContent } from "~/utils/strings";

type LoaderData = { posts: PostWithCommentCount[] };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const posts = await getPostsForSpace(params.id);

  const data: LoaderData = { posts };
  return json(data);
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

  if (typeof content !== "string" || params.id == undefined) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    content: validatePostContent(content),
  };

  const fields = { content };
  if (!fieldErrors.content) {
    return badRequest({
      fieldErrors: { content: "You have to post something" },
      fields,
    });
  }

  await createPost(content, params.id, user.address);
  return redirect(`/space/${params.id}/feed`);
};

export default function () {
  const data = useLoaderData<LoaderData>();
  const user = useUser();
  const fetcher = useFetcher();

  const [postContent, setPostContent] = useState<string>();

  function onChange(x: string) {
    setPostContent(x);
  }

  function onSubmit() {
    if (postContent) {
      fetcher.submit({ content: postContent }, { method: "post" });
    }
  }

  return (
    <div>
      <div className="my-4">
        <PostEdit
          placeholder="Create a post"
          handleChange={(x: string) => onChange(x)}
          handleSubmit={() => onSubmit()}
        />
      </div>
      {data.posts.length > 0 ? (
        <ul>
          {data.posts.map((post) => (
            <li
              key={post.id}
              className="border-lg border border-b-0 bg-white first:rounded-t-lg last:rounded-b-lg last:border-b"
            >
              <PostCard post={post} showEngagementBar />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            You're the first one here!
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Go on, make history and be the first to post.
          </p>
        </div>
      )}
    </div>
  );
}
