// Url "/"
// This is a server component,

import XLSXExample from "@/components/examples/xlsx/XLSXExample";

// it render a client/server component,
const HomePage = () => {
  return (
    <>
      <div className="mx-auto text-white">
        <h1 className="text-lg">Testing Functionality</h1>
        <hr />
        <br />

        {/* Testing component */}
        <XLSXExample />
      </div>
    </>
  );
};

export default HomePage;
