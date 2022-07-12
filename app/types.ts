import type { Comment, Post, Space, Wallet } from "@prisma/client";

export interface SpaceWithMembersCount extends Space {
  _count: {
    members: number;
  };
}

export interface WalletWithMemberships extends Wallet {
  memberships: {
    space: Space;
  }[];
}

export interface PostWithComments extends Post {
  _count: {
    comments: number;
  };
  comments: Comment[];
}

export interface PostWithCommentCount extends Post {
  _count: {
    comments: number;
  };
}
