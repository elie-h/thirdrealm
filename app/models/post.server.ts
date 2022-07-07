import type { Post, Space } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getPostsForSpace(spaceId: Space["id"]) {
  return await prisma.post.findMany({
    where: { spaceId },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
    },
  });
}

export async function createPost(
  title: Post["title"],
  content: Post["content"],
  spaceId: Post["spaceId"],
  authorAddress: Post["authorAddress"]
) {
  return await prisma.post.create({
    data: { title, content, spaceId },
  });
}
