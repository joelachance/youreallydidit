'use client';
import { useEffect, useState } from 'react';
import { getUser } from './db/users';
import { getPosts } from './db/posts';
import { CreatePost } from './post';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

export default function Home() {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    (async () => {
      await getUser();
    })();

    (async () => {
      const dbPosts = await getPosts();
      await setPosts(dbPosts);
    })();
  }, [])


  return (
    <div className="grid grid-cols-8 gap-4 min-h-screen bg-[#001219] text-offwhite font-code">
      <SignedOut>
        <div className="col-start-2 col-span-6 flex flex-row justify-center self-center">
          <SignInButton>
            <button className="bg-mint text-dark h-20 w-64 rounded-md">Sign In, Bitch</button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-row justify-center items-center self-center col-start-2 col-span-5">
          <CreatePost posts={posts} />
        </div>
        <div className="flex flex-row justify-center items-start sm:col-start-7 md:col-start-8 col-span-2 m-5">
          <UserButton />
        </div>
      </SignedIn>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
