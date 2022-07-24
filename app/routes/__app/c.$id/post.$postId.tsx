import { type Comment } from "@prisma/client";
import {
  json,
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import invariant from "tiny-invariant";
import CommentCard from "~/components/CommentCard";
import CommentForm from "~/components/CommentForm";
import PostCard from "~/components/PostCard.client";
import {
  createComment,
  getPost,
  type PostWithComments,
} from "~/models/post.server";
import { requireUser } from "~/session.server";
import { isEmptyString } from "~/utils/strings";

type LoaderData = { post: PostWithComments };

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

  if (typeof content !== "string" || params.postId == undefined) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    content: !isEmptyString(content),
  };

  const fields = { content };
  if (!fieldErrors.content) {
    return badRequest({
      fieldErrors: { content: "You have to post something" },
      fields,
    });
  }

  await createComment(content, params.postId, user.address);
  return redirect(`/c/${params.id}/post/${params.postId}`);
};

export default function Post() {
  const { post } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  function onSubmit(comment: string) {
    if (comment) {
      fetcher.submit({ content: comment }, { method: "post" });
    }
  }

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <Link to={`/c/${post.communityId}/feed`}>
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
      <div className="border-lg rounded-lg border bg-white">
        <ClientOnly>
          {() => <PostCard post={post} showEngagementBar />}
        </ClientOnly>
      </div>

      <div className="my-4">
        <CommentForm handleSubmit={onSubmit} />
      </div>
      {post.comments.length > 0 ? (
        <ul>
          {post.comments.map((comment: Comment) => (
            <li
              key={comment.id}
              className="border-lg border border-b-0 bg-white first:rounded-t-lg last:rounded-b-lg last:border-b"
            >
              <CommentCard comment={comment} />
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
            Be the first one to comment
          </h3>
        </div>
      )}
    </div>
  );
}
