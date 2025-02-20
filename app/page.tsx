// Url "/"
// This is a server component,

import IndicatorList from "@/components/examples/react_select_example/IndicatorList";

// it render a client/server component,
const HomePage = () => {
  return (
    <>
      <div className="mx-auto text-black">
        <h1 className="text-lg text-white">Testing Functionality</h1>
        <hr />
        <br />

        {/* Testing component */}
        <IndicatorList />
      </div>
    </>
  );
};

export default HomePage;
