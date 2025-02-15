"use client";

const PostForm = ({
  addPost,
}: {
  addPost: (post: { title: string; body: string }) => void;
}) => {
  const formAction = (formData: FormData) => {
    const newPost = {
      title: formData.get("title")!.toString(),
      body: formData.get("body")!.toString(),
    };

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

      <button className="bg-green-700 px-5 py-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PostForm;
