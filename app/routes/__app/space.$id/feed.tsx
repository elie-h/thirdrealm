import { Post } from "@prisma/client";
import {
  json,
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { title } from "process";
import invariant from "tiny-invariant";
import { brotliDecompressSync } from "zlib";
import Posts from "~/components/Post";
import { checkTokenOwnership } from "~/data/blockchain.server";
import { createPost, getPostsForSpace } from "~/models/post.server";
import {
  getSpaceAndMembersById,
  getSpaceById,
  upsertSpaceMembership,
} from "~/models/spaces.server";
import { requireUser } from "~/session.server";
import { type SpaceWithCollection } from "~/types";
import { truncateEthAddress } from "~/utils";

type LoaderData = { posts: Post[] };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const posts = await getPostsForSpace(params.id);

  const data: LoaderData = { posts };
  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const title = body.get("title");
  const content = body.get("description");

  invariant(title, "Title is required");
  const newPost = await createPost(title, content, params.id, user.address);
  return newPost;
};

export default function () {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <div className="mb-8">
        <form method="post" className="relative mx-4">
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
              placeholder="Title"
            />
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              rows={2}
              name="description"
              className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Write a description..."
              defaultValue={""}
            />

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
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>{" "}
      </div>
      <Posts posts={data.posts} />
    </div>
  );
}
