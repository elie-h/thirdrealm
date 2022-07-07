import { type Post } from "@prisma/client";
import { json, type LoaderFunction } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import Posts from "~/components/Post";
import { getPostsForSpace } from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = { posts: Post[] };

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
    title: string | undefined;
    content: string | undefined;
  };
  fields?: {
    title: string;
    content: string;
  };
};

export default function () {
  const data = useLoaderData<LoaderData>();
  const params = useParams();

  return (
    <div>
      <div className="mb-4 text-center">
        <Link to={`/new/${params.id}`}>
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-3 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              defaultValue={""}
            />
          </div>
        </Link>
      </div>
      <Posts posts={data.posts} />
    </div>
  );
}
