const Carts = ({ carts }: { carts: { id: number; title: string }[] }) => {
  if (carts.length === 0) return null;
  return (
    <>
      <h2>Your carts: </h2>
      {carts.map((cart) => (
        <p key={cart.id}>{cart.title}</p>
      ))}
    </>
  );
};

export default Carts;
