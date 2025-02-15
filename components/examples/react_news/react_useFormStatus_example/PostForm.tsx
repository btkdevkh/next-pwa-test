"use client";

import { useFormStatus } from "react-dom";

const PostForm = ({
  addPost,
}: {
  addPost: (post: { title: string; body: string }) => void;
}) => {
  const formAction = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPost = {
      title: formData.get("title")!.toString(),
      body: formData.get("body")!.toString(),
    };

    if (!newPost.title || !newPost.body) return;

    addPost(newPost);
  };

  return (
    <form action={formAction} className="text-slate-950">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="p-2 w-full"
      />
      <br />
      <br />

      <textarea
        className="p-2 w-full"
        name="body"
        id=""
        placeholder="Body"
      ></textarea>

      <br />
      <br />
      <SubmitButton />
    </form>
  );
};

export default PostForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-green-700 px-5 py-2 w-32"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};
