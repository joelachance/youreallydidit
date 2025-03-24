"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "./db/users";
import { getPosts } from "./db/posts";
import { CreatePost } from "./post";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Switch } from "@radix-ui/themes";
import { Post } from "./types";
import "./globals.css";

// Type for the actual response from getPosts()
type PostsResponse = Array<Post> | [];

export default function Home(): React.ReactElement {
  const [posts, setPosts] = useState<PostsResponse>([]);
  const [nsfw, setNsfw] = useState<boolean>(
    window.localStorage.getItem("nsfw") == "true"
  );

  useEffect(() => {
    (async (): Promise<void> => {
      await getUser();
    })();

    (async (): Promise<void> => {
      const dbPosts = await getPosts();
      await setPosts(dbPosts);
    })();
  }, []);

  const toggleNsfw = (): void => {
    const nextNsfw = !nsfw;
    const nextNsfwStr = nextNsfw.toString();
    setNsfw(nextNsfw);
    window.localStorage.setItem("nsfw", nextNsfwStr);
  };

  return (
    <div className="flex justify-center min-h-screen text-offwhite font-code bg-[#001219]">
      <SignedOut>
        <div className="flex flex-col md:flex-row justify-center md:justify-normal h-screen w-5/6 md:w-3/5 mt-10">
          <div className="text-3xl my-3">
            {nsfw ? "YOU FUCKING DID IT." : "YOU REALLY DID IT."}
          </div>
          <div className="flex flex-row justify-center items-center">
            <SignInButton>
              <button className="bg-mint text-dark h-20 w-64 rounded-md">
                {nsfw ? "Sign In, Bitch" : "Sign In"}
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col justify-between w-5/6 md:w-3/5">
          <div className="flex flex-col justify-between min-h-screen">
            <div className="w-full flex flex-row justify-center">
              <CreatePost nsfw={nsfw} posts={posts} setPosts={setPosts} />
            </div>
            <footer className="flex w-5/6 md:w-3/5 my-4 self-center">
              <div>
                <div className="my-2">
                  <UserButton />
                </div>
                <div>
                  <Switch
                    onCheckedChange={toggleNsfw}
                    defaultChecked={false}
                    checked={nsfw}
                    variant="surface"
                    radius="medium"
                    size="3"
                    color="red"
                    className="my-1 mr-4 before:bg-mint"
                  />
                </div>
                <div className="text-xs my-2">NSFW</div>
                <div className="text-xs text-gray-400 mt-2 flex items-center">
                  <span>&copy; {new Date().getFullYear()} m0thership</span>
                  <span className="mx-2">•</span>
                  <a
                    href="mailto:y0ur3allydidit@gmail.com"
                    className="hover:text-mint transition-colors"
                  >
                    y0ur3allydidit@gmail.com
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

