"use client";
import { useEffect, useState } from "react";
import { getUser } from "./db/users";
import { getPosts } from "./db/posts";
import { CreatePost } from "./post";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Switch } from "@radix-ui/themes";
import "./globals.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [nsfw, setNsfw] = useState(
    window.localStorage.getItem("nsfw") == "true"
  );

  useEffect(() => {
    (async () => {
      await getUser();
    })();

    (async () => {
      const dbPosts = await getPosts();
      await setPosts(dbPosts);
    })();
  }, []);

  const toggleNsfw = () => {
    const nextNsfw = !nsfw;
    const nextNsfwStr = nextNsfw.toString();
    setNsfw(nextNsfw);
    window.localStorage.setItem("nsfw", nextNsfwStr);
  };

  return (
    <div className="grid grid-cols-8 gap-4 min-h-screen text-offwhite font-code bg-[#001219]">
      <SignedOut>
        <div className="col-start-2 col-span-6 flex flex-row justify-center self-center">
          <SignInButton>
            <button className="bg-mint text-dark h-20 w-64 rounded-md">
              {nsfw ? "Sign In, Bitch" : "Sign In"}
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-row justify-start items-start self-start col-start-2 col-span-5 mt-10">
          <CreatePost nsfw={nsfw} posts={posts} setPosts={setPosts} />
        </div>
        <div className="flex flex-row justify-center items-start sm:col-start-7 md:col-start-8 col-span-2 m-5">
          <UserButton />
        </div>
      </SignedIn>
      <footer className="row-start-3 flex m-4 relative">
        <div className="flex-col place-content-end">
          <div>
            <Switch
              onCheckedChange={toggleNsfw}
              defaultChecked={false}
              checked={nsfw}
              variant="surface"
              radius="medium"
              size="3"
              color="red"
              className="m-1 mr-4 before:bg-mint"
            />
          </div>
          <div className="text-xs m-2">NSFW</div>
        </div>
      </footer>
    </div>
  );
}
