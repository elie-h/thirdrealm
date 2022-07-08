import { type Post } from "@prisma/client";
import { truncateEthAddress } from "~/utils/eth";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { deserialize } from "~/utils/strings";

interface PostsProps extends React.ComponentPropsWithoutRef<"div"> {
  posts: Post[];
}

export default function Posts({ posts = [] }: PostsProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border border-gray-100">
          <div className="grid grid-flow-col grid-cols-12 grid-rows-6 gap-x-8 gap-y-2 p-4">
            <div className="col-span-2 row-span-6 sm:col-span-1 ">
              <Jazzicon
                diameter={42}
                seed={jsNumberForAddress(post.authorAddress)}
              />
            </div>
            <div className="col-span-10 row-span-2">
              <div className="flex flex-row">
                <p className="text-bold pr-2 text-xs font-medium">
                  <button className="hover:underline">
                    {truncateEthAddress(post.authorAddress)}
                  </button>
                </p>
                <span className="pr-2">·</span>
                <p className="text-xs text-gray-500">
                  <time>{post.createdAt}</time>
                </p>
              </div>
            </div>
            <div className="col-span-10 row-span-4 ">
              <div className="text-md text-black">
                <div>
                  {deserialize(post.content).map((parentNode) =>
                    parentNode.children.map((x, i) => {
                      return <p key={i}>{x.text}</p>;
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-6 flex justify-between space-x-8">
              <div className="flex space-x-6">
                <span className="inline-flex items-center text-sm">
                  <button
                    type="button"
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span className="font-medium text-gray-900">29</span>
                    <span className="sr-only">likes</span>
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button
                    type="button"
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium text-gray-900">11</span>
                    <span className="sr-only">replies</span>
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button
                    type="button"
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium text-gray-900">2.7k</span>
                    <span className="sr-only">views</span>
                  </button>
                </span>
              </div>
              <div className="flex text-sm">
                <span className="inline-flex items-center text-sm">
                  <button
                    type="button"
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span className="font-medium text-gray-900">Share</span>
                  </button>
                </span>
              </div>
            </div> */}
        </li>
      ))}
    </ul>
  );
}
