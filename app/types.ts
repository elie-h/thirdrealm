import type { Collection, Post, Space, Wallet, Comment } from "@prisma/client";

export interface SpaceWithCollection extends Space {
  collection: Collection;
  _count: {
    members: number;
  };
}

export interface WalletWithMemberships extends Wallet {
  memberships: {
    space: SpaceWithCollection;
  }[];
}

export interface PostWithComments extends Post {
  comments: Comment[];
}
