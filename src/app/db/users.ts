'use server';
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from "./";

export async function createUser(name: string, email: string) {
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
        })
        await prisma.$disconnect()
        return user;
}


export async function getUser() {
    const user = await currentUser();
    if(!user) return null;

    // We've got a Clerk user
    const email: string =  user?.emailAddresses[0]?.emailAddress;
    const name = `${user?.firstName} ${user?.lastName}`;
    
    let dbUser = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    await prisma.$disconnect()
    
    if (!dbUser) {
        dbUser = await createUser(name, email);
    } 
    
    return JSON.parse(JSON.stringify({ user, name, email, id: dbUser.id }));
}


export async function getUsers() {
    const users = await prisma.user.findMany()
    await prisma.$disconnect()
    return users;
}