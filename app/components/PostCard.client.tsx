import { type Post } from "@prisma/client";
import { Link } from "@remix-run/react";
import Blocks from "editorjs-blocks-react-renderer";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { friendlyDate } from "~/utils";
import { truncateEthAddress } from "~/utils/eth";

interface PostWithCommentCount extends Post {
  _count: {
    comments: number;
  };
}

interface PostProps {
  post: PostWithCommentCount;
  showEngagementBar?: boolean;
}

export default function PostCard({
  post,
  showEngagementBar = false,
}: PostProps) {
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="space-y-4 p-5">
      <Link to={`/c/${post.communityId}/post/${post.id}`}>
        <h1 className="text-xl font-bold">{post.title}</h1>
      </Link>
      <div className="flex flex-row space-x-2">
        <div>
          <Jazzicon
            diameter={24}
            seed={jsNumberForAddress(post.authorAddress)}
          />
        </div>
        <div>
          <p className="text-bold pr-2 text-xs font-medium">
            <button className="hover:underline">
              {truncateEthAddress(post.authorAddress)}
            </button>
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            <time>{friendlyDate(post.createdAt)}</time>
          </p>
        </div>
      </div>
      <div>
        <section>
          <Blocks
            // @ts-ignore
            data={post.content}
            config={{
              header: { className: "text-lg" },
              image: {
                className: "w-full max-w-screen-md",
                actionsClassNames: {
                  stretched: "w-full h-80 object-cover",
                  withBorder: "border border-2",
                  withBackground: "p-2",
                },
              },
            }}
          />
        </section>
      </div>
      {showEngagementBar ? (
        <div>
          <div className="col-span-10 row-span-2 mt-2 flex">
            <Link
              to={`/c/${post.communityId}/post/${post.id}`}
              className="inline-flex items-center rounded-full border border-transparent p-1 text-black shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="ml-1 text-xs">{post._count.comments}</span>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
