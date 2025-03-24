export function ShowPosts({ posts }) {
  return (
    <div className="h-full max-h-80 overflow-y-scroll">
      {posts.map((post) => {
        return (
          <div key={post.id} className="m-3 overflow-y-scroll">
            <div className="m-1 text-xs font-sans">
              {post.createdAt.toLocaleDateString()}
            </div>
            <div className="m-1 text-xs font-sans">{post.content}</div>
          </div>
        );
      })}
    </div>
  );
}
