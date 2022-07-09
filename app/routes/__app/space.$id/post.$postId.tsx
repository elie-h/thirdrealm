import { type Post } from "@prisma/client";
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostCard from "~/components/PostCard";
import { getPost } from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.postId, "id is required");
  const post = await getPost(params.postId);
  if (post) {
    const data: LoaderData = { post };
    return json(data);
  }
  // TODO: Handle missing ones here
  return json({}, { status: 404 });
};

export default function Post() {
  const { post: data } = useLoaderData<LoaderData>();
  return (
    <div>
      <PostCard post={data} />
    </div>
  );
}
