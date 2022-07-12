import type { Post, Space } from "@prisma/client";

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

export async function getPostsForSpace(spaceId: Space["id"]) {
  return await prisma.post.findMany({
    where: { spaceId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true },
      },
      author: true,
    },
  });
}

export async function createPost(
  content: Post["content"],
  spaceId: Post["spaceId"],
  authorAddress: Post["authorAddress"]
) {
  return await prisma.post.create({
    data: { content, spaceId, authorAddress },
  });
}

export async function createComment(
  content: Post["content"],
  postId: Post["id"],
  authorAddress: Post["authorAddress"]
) {
  return await prisma.comment.create({
    data: { content, postId, authorAddress },
  });
}
