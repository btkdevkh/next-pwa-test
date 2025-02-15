const LazyPostList = ({
  posts,
}: {
  posts: { title: string; body: string }[];
}) => {
  return (
    <>
      {posts.length > 0 &&
        posts.map((post, idx) => (
          <div key={idx} className="bg-slate-700 px-4 py-2 mb-2">
            <p>Title: {post.title}</p>
            <p>Description : {post.body}</p>
          </div>
        ))}
    </>
  );
};

export default LazyPostList;
