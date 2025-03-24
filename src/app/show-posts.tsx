import React, { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Post } from "./types";

// Type for the actual posts data structure from the database
type PostsResponse = Array<Post> | [];

interface ShowPostsProps {
  posts: PostsResponse;
}

export function ShowPosts({ posts }: ShowPostsProps): React.ReactElement {
  const [filterWorkPosts, setFilterWorkPosts] = useState<boolean | null>(null);
  
  // Filter posts based on workPost status if filter is active
  const filteredPosts = filterWorkPosts !== null
    ? posts.filter(post => post.workPost === filterWorkPosts)
    : posts;
    
  return (
    <div className="my-16">
      <div className="flex items-center gap-4 my-4">
      <Badge variant="outline"
        onClick={() => setFilterWorkPosts(null)}
        className={`px-3 py-1 text-xs rounded-full transition-colors ${
          filterWorkPosts === null 
            ? 'bg-mint text-dark font-bold border-slate-800' 
            : 'bg-dark text-slate-300 border-slate-800'
        }`}
      >All</Badge>

        <Badge variant="outline" 
          onClick={() => setFilterWorkPosts(true)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            filterWorkPosts === true 
              ? 'bg-mint text-dark font-bold border-slate-800' 
              : 'bg-dark text-slate-300 border-slate-800'
          }`}
        >
          Work
        </Badge>
        <Badge variant="outline" 
          onClick={() => setFilterWorkPosts(false)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            filterWorkPosts === false 
              ? 'bg-mint text-dark font-bold border-slate-800' 
              : 'bg-dark text-slate-300 border-slate-800'
          }`}
        >
          Personal
        </Badge>
      </div>
      
      <div className="h-3/6 my-4 overflow-y-scroll">
        {filteredPosts.map((post) => {
          return (
            <div key={post.id} className="my-3 overflow-y-scroll">
              <div className="flex items-center gap-2">
                <div className="text-md font-sans font-bold">
                  {post.createdAt.toLocaleDateString()}
                </div>
                {post.workPost && (
                  <span className="bg-mint text-dark px-2 py-0.5 text-xs rounded-full">
                    Work
                  </span>
                )}
              </div>
              <div className="my-1 text-sm font-sans">{post.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
