import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import invariant from "tiny-invariant";
import PostCard from "~/components/PostCard.client";
import {
  getPostsForCommunity,
  type PostsForCommunities,
} from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = { posts: PostsForCommunities };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const posts = await getPostsForCommunity(params.id);

  const data: LoaderData = { posts };
  return json(data);
};

export default function () {
  const data = useLoaderData<LoaderData>();
  const params = useParams();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-1">
        <h3 className="font-lg text-xl font-bold leading-6">Feed</h3>
        <Link
          to={`/c/${params.id}/new`}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New
        </Link>
      </div>
      {data.posts.length > 0 ? (
        <ClientOnly>
          {() => (
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
          )}
        </ClientOnly>
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
