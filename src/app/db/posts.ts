'use server';
import { currentUser } from '@clerk/nextjs/server'

import { prisma } from "./";
import { getUser } from "./users";

export async function addPost(content: string) {
    const { id } = await getUser();
    const newPost = await prisma.post.create({
        data: {
            content,
            userId: id,
        }
    })
    await prisma.$disconnect()
    return newPost;
}


type Post = {
    posts: Array<string | null>,
    email: string | null,
    name: string,
}


export async function getPosts() {
    const clerkUser = await currentUser();
    if(!clerkUser) return [];

    const email = clerkUser?.emailAddresses[0]?.emailAddress || null;
    let dbUser: Post = { posts: null };
    dbUser = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            email: true,
            name: true,
            posts: true,
        },
    })
    await prisma.$disconnect()

    return dbUser.posts;
}