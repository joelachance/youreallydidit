export function ShowPosts({ posts }) {

    return (
        <>
            {posts.map(post => {
                return (
                <div key={post.id} className="m-3">
                    <div className="m-1">
                        {post.createdAt.toLocaleDateString()}
                    </div>
                    <div className="m-1">
                        {post.content}
                    </div>
                </div>)
            })}
        </>
    );
}