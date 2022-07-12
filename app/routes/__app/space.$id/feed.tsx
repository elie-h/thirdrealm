import {
  json,
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
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
      <div className="mt-5 mb-10 grid grid-flow-col grid-cols-12 grid-rows-6 gap-x-8 gap-y-2 rounded-lg border bg-white p-4 pt-6">
        <div className="col-span-2 row-span-6 sm:col-span-1 ">
          <Jazzicon diameter={42} seed={jsNumberForAddress(user.address)} />
        </div>
        <div className="col-span-10 row-span-6 h-auto flex-grow">
          <PostEdit
            placeholder="Create a post"
            handleChange={(x: string) => onChange(x)}
            handleSubmit={() => onSubmit()}
          />
        </div>
      </div>
      <ul className="">
        {data.posts.map((post) => (
          <li
            key={post.id}
            className="border-lg border border-b-0 bg-white first:rounded-t-lg last:rounded-b-lg last:border-b"
          >
            <PostCard post={post} showEngagementBar />
          </li>
        ))}
      </ul>
    </div>
  );
}
