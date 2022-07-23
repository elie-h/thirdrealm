import { type Community } from "@prisma/client";

interface CommunityCardProps extends React.ComponentPropsWithoutRef<"div"> {
  community?: Community;
  loading: boolean;
}

export default function CommunityCard({
  community,
  loading,
}: CommunityCardProps) {
  return (
    <div className="relative col-span-1 flex rounded-md shadow-md">
      {loading ? (
        <div className="animate-pulse rounded-xl bg-gray-200 object-contain sm:h-72 sm:w-full"></div>
      ) : (
        <img
          src={community?.coverImage}
          alt={community?.name}
          className="rounded-md"
        />
      )}
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md  border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-lg">
          <div className="font-bold text-gray-900 hover:text-gray-600">
            {community?.name}
          </div>
          {/* <p className="text-gray-500">24 Notifications</p> */}
        </div>
      </div>
    </div>
  );
}
