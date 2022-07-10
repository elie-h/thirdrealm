import { type Post } from "@prisma/client";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { friendlyDate } from "~/utils";
import { truncateEthAddress } from "~/utils/eth";
import { deserialize } from "~/utils/strings";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  return (
    <div className="grid select-text grid-flow-col grid-cols-12 grid-rows-6 gap-x-8 gap-y-2 border border-gray-100 p-4 hover:bg-gray-50">
      <div className="col-span-2 row-span-6 sm:col-span-1 ">
        <Jazzicon diameter={42} seed={jsNumberForAddress(post.authorAddress)} />
      </div>
      <div className="col-span-10 row-span-6">
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
      </div>
    </div>
  );
}
