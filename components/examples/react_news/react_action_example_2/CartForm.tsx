const CartForm = ({
  item,
  addToCart,
}: {
  item: { id: number; title: string };
  addToCart: (id: number) => Promise<void>;
}) => {
  const formAction = async (formData: FormData) => {
    const itemId = formData.get("item-id")?.toString();
    if (itemId) await addToCart(+itemId);
  };

  return (
    <div className="bg-gray-300 text-black p-3">
      <p className="mb-3">{item.title}</p>

      <form action={formAction}>
        <input type="hidden" name="item-id" value={item.id} />
        <button className="px-5 py-3 bg-indigo-800 text-white">
          Add to cart
        </button>
      </form>
    </div>
  );
};

export default CartForm;
