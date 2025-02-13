import { Suspense, use } from "react";

const fetchPost = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const PostItems = () => {
  const posts = use(fetchPost());
  return <div>{JSON.stringify(posts)}</div>;
};

const Posts = () => {
  return (
    <Suspense
      fallback={<h2 className="text-2xl text-center mt-5">Loading...</h2>}
    >
      <PostItems />;
    </Suspense>
  );
};

export default Posts;
