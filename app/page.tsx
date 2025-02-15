import { Suspense } from "react";
import TodosClient from "@/components/examples/suspense_example/TodosClient";

// Url "/"
// This is a server component,
// it render a client/server component,
const HomePage = () => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-lg">Testing Functionality</h1>
        <hr />
        <br />

        {/* Testing component */}
      </div>
    </>
  );
};

export default HomePage;
