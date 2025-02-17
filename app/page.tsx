import ArrayNotNull from "@/components/examples/array_not_null/ArrayNotNull";

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
        <ArrayNotNull />
      </div>
    </>
  );
};

export default HomePage;
