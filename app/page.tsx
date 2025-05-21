// import XLSXExample from "@/components/examples/xlsx/XLSXExample";
import ReactQuery from "@/components/examples/react_query/ReactQuery";
import ReactQueryProvider from "@/components/examples/react_query/ReactQueryProvider";

// Url "/"
// This is a server component,
// it render a client/server component,
const HomePage = () => {
  return (
    <>
      <div className="mx-auto text-white">
        <h1 className="text-lg">Testing Functionality</h1>
        <hr />
        <br />

        {/* Testing component */}
        {/* <XLSXExample /> */}
        <ReactQueryProvider>
          <ReactQuery />
        </ReactQueryProvider>
      </div>
    </>
  );
};

export default HomePage;
