"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./";
import { getUser } from "./users";
import { Post } from "../types";

export async function addPost(content: string, workPost: boolean = false) {
  const { id } = await getUser();
  const newPost = await prisma.post.create({
    data: {
      content,
      userId: id,
      workPost,
    },
  });
  await prisma.$disconnect();
  return newPost;
}

interface UserData {
  id?: number;
  email: string | null;
  name: string;
  posts?: Array<Post> | null;
}

export async function getPosts() {
  const clerkUser = await currentUser();
  if (!clerkUser) return [];

  const email = clerkUser?.emailAddresses[0]?.emailAddress || null;
  let dbUser: UserData = { email: null, name: "" };

  // Only query if we have a valid email
  if (email) {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        posts: true,
      },
    });

    // Handle the case where no user is found
    if (result) {
      dbUser = result as UserData;
    }
  }

  await prisma.$disconnect();

  return dbUser.posts || [];
}
