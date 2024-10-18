'use client';
import { useState } from "react";
import { addPost } from "./db/posts";
import { ShowPosts } from "@/show-posts";

export function CreatePost({ posts }) {
    const [post, setPost] = useState('');
    const [success, setSuccess] = useState(false);

    const create = async (data): Promise<void> => {
        const achievement = data.get('achievement');
        const res = await addPost(achievement);
        if (res.id) {
            // reset state
            setPost('');
            // flash the success icon
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        }
    }
    return (
        <div className="text-offwhite w-full ml-4">
            <div className="text-3xl m-3">YOU REALLY DID IT.</div>
            <div className="text-l m-3">LOG IT</div>
            <form
                action={create}
                className="flex flex-col items-start">
                <textarea
                    name="achievement"
                    value={post}
                    onChange={e => setPost(e.target.value)}
                    placeholder="Tell us about it already..."
                    className="
                        h-24
                        w-4/5
                        m-4
                        p-1
                        bg-dark
                        border
                        border-solid
                        border-offwhite
                        rounded-md
                ">
                </textarea>
                <button type="submit" className="text-xl bg-mint text-dark h-20 w-48 m-3 rounded-md">{success ? 'GOT IT' : 'SAVE IT'}</button>
            </form>
           <ShowPosts posts={posts} />
        </div>
    );
}