import MessageClient from "@/components/examples/use_hook_example/message/MessageClient";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-lg">Testing Functionality</h1>
        <hr />
        <br />

        {/* Testing component */}
        <MessageClient />
      </div>
    </>
  );
};

export default HomePage;
