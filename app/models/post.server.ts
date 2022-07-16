import type { Post, Prisma, Community, Comment } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getPost(id: Post["id"]) {
  return await prisma.post.findFirst({
    where: { id },
    include: {
      _count: {
        select: { comments: true },
      },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
        },
      },
    },
  });
}

export type PostWithComments = Prisma.PromiseReturnType<typeof getPost>;

export async function getPostsForCommunity(communityId: Community["id"]) {
  return await prisma.post.findMany({
    where: { communityId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true },
      },
      author: true,
    },
  });
}

export type PostsForCommunities = Prisma.PromiseReturnType<
  typeof getPostsForCommunity
>;

export async function createPost(
  content: Post["content"],
  communityId: Post["communityId"],
  authorAddress: Post["authorAddress"]
) {
  if (content == null) {
    throw new Error("Content is required");
  }
  return await prisma.post.create({
    data: { content, communityId, authorAddress },
  });
}

export async function createComment(
  content: Comment["content"],
  postId: Post["id"],
  authorAddress: Comment["authorAddress"]
) {
  return await prisma.comment.create({
    data: { content, postId, authorAddress },
  });
}
