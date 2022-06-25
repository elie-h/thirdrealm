import type { Space, Collection } from "@prisma/client";

export interface SpaceWithCollection extends Space {
  collection: Collection;
  _count: {
    members: number;
  };
}
