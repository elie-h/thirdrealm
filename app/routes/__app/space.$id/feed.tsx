import { type Post } from "@prisma/client";
import {
  json,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Posts from "~/components/Post";
import { createPost, getPostsForSpace } from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = { posts: Post[] };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const posts = await getPostsForSpace(params.id);

  const data: LoaderData = { posts };
  return json(data);
};

function validatePostTitle(title: string) {
  if (title.length < 2) {
    return `Post title is too short`;
  }
}

function validatePostContent(content: string) {
  if (content.length < 2) {
    return `Post body is too short`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    content: string | undefined;
  };
  fields?: {
    title: string;
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export default function () {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <div className="mb-8"></div>
      <Posts posts={data.posts} />
    </div>
  );
}
