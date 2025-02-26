import NivoResponsiveLine from "@/components/examples/nivo_example/NivoResponsiveLine";

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
        <NivoResponsiveLine />
      </div>
    </>
  );
};

export default HomePage;
