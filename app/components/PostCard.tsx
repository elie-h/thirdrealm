import { Link } from "@remix-run/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { type PostWithCommentCount } from "~/types";
import { friendlyDate } from "~/utils";
import { truncateEthAddress } from "~/utils/eth";
import { deserialize } from "~/utils/strings";

interface PostProps {
  post: PostWithCommentCount;
  showEngagementBar?: boolean;
}

export default function PostCard({
  post,
  showEngagementBar = false,
}: PostProps) {
  return (
    <div className="h-36">
      <div className="grid-rows-12 grid min-h-full select-text grid-flow-col grid-cols-12 gap-x-8 gap-y-2 p-4 ">
        <div className="row-span-12 col-span-2 sm:col-span-1 ">
          <Jazzicon
            diameter={42}
            seed={jsNumberForAddress(post.authorAddress)}
          />
        </div>
        <div className="row-span-10 col-span-10">
          <div className="mb-2">
            <div className="flex flex-row">
              <p className="text-bold pr-2 text-xs font-medium">
                <button className="hover:underline">
                  {truncateEthAddress(post.authorAddress)}
                </button>
              </p>
              <span className="pr-2">·</span>
              <p className="text-xs text-gray-500">
                <time>{friendlyDate(post.createdAt)}</time>
              </p>
            </div>
          </div>
          <div>
            <div className="text-md text-black ">
              <div>
                {deserialize(post.content).map((parentNode) =>
                  parentNode.children.map((x, i) => {
                    return (
                      <p key={i}>
                        {x.text} <br />
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          {showEngagementBar ? (
            <div>
              <div className="col-span-10 row-span-2 mt-2 flex">
                <Link
                  to={`/space/${post.spaceId}/post/${post.id}`}
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
                  {/* @ts-ignore */}
                  <span className="ml-1 text-xs">{post._count.comments}</span>
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
