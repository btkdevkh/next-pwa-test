"use client";

import { lazy, Suspense, useState } from "react";
import PostForm from "./PostForm";

const LazyPostList = lazy(() => import("./LazyPostList"));

const Posts = () => {
  const [posts, setPosts] = useState<{ title: string; body: string }[]>([]);

  const addPost = (newPost: { title: string; body: string }) => {
    setPosts((prev) => [...prev, newPost]);
  };

  console.log(posts);

  return (
    <>
      <PostForm addPost={addPost} />
      <br />

      <Suspense fallback={<p className="text-white text-center">Loading...</p>}>
        <LazyPostList posts={posts} />
      </Suspense>
    </>
  );
};

export default Posts;
