"use client";
import React, { useState } from "react";
import { addPost, getPosts } from "./db/posts";
import { ShowPosts } from "./show-posts";
import { Checkbox } from "@/components/ui/checkbox";
import { Post } from "./types";

// Type for the actual response from getPosts()
type PostsResponse = Array<Post> | [];

interface CreatePostProps {
  posts: PostsResponse;
  nsfw: boolean;
  setPosts: React.Dispatch<React.SetStateAction<PostsResponse>>;
}

export function CreatePost({
  posts,
  nsfw,
  setPosts,
}: CreatePostProps): React.ReactElement {
  const [post, setPost] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isWorkPost, setIsWorkPost] = useState<boolean>(false);

  const create = async (data: FormData): Promise<void> => {
    try {
      const achievement = data.get("achievement") as string;
      
      if (achievement.trim() === "") {
        return; // Early return for empty posts
      }
      
      const res = await addPost(achievement, isWorkPost);
      
      if (res.id) {
        // reset state
        setPost("");
        setIsWorkPost(false);
        // flash the success icon
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        
        // Fetch updated posts
        const dbPosts = await getPosts();
        await setPosts(dbPosts);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-5/6 md:w-3/5 mt-10">
      <div className="text-3xl my-3">
        {nsfw ? "YOU FUCKING DID IT." : "YOU REALLY DID IT."}
      </div>
      <form action={create}>
        <textarea
          name="achievement"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder={
            nsfw ? "Tell us what the fuck happened" : "Tell us about it"
          }
          className="
                        h-20
                        w-full
                        my-4
                        p-1
                        bg-dark
                        border
                        border-solid
                        border-slate-800
                        rounded-md
                        text-slate-400
                "
        ></textarea>

        <div className="flex items-center mb-4">
          <Checkbox
            id="work-post"
            checked={isWorkPost}
            className="w-4 h-4 text-mint bg-dark border-slate-800 rounded focus:ring-mint"
            onCheckedChange={(checked) => setIsWorkPost(checked as boolean)}
          />
          <label
            htmlFor="work-post"
            className="ml-2 text-sm font-medium text-offwhite"
          >
            Work
          </label>
        </div>

        <button
          type="submit"
          className="
                        text-l
                        bg-mint
                        text-dark
                        h-16
                        w-48
                        my-3
                        rounded-md"
        >
          <div className="flex flex-row items-center justify-center gap-2 font-bold">
              <>
                {nsfw
                  ? success ? "SAVED, BITCH" : "SAVE THAT SHIT"
                  : success ? "SAVED IT" : "SAVE IT"}
                
                {success && (
                  <div className="ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20" 
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                )}
              </>
          </div>
        </button>
      </form>
      <ShowPosts posts={posts || []} />
    </div>
  );
}
