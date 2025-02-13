import { Suspense, use } from "react";

const fetchData = async () => {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  return res.json();
};

const JokeItem = () => {
  const joke = use(fetchData());
  return <div>{JSON.stringify(joke)}</div>;
};

const Joke = () => {
  return (
    <Suspense
      fallback={<h2 className="text-2xl text-center mt-5">Loading...</h2>}
    >
      <JokeItem />;
    </Suspense>
  );
};

export default Joke;
