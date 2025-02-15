"use client";

import { useState } from "react";
import CartForm from "./CartForm";
import Carts from "./Carts";

const CartList = () => {
  const [items, setItems] = useState<{ id: number; title: string }[]>([
    { id: 1, title: "JavaScript: The definitive guide" },
    { id: 2, title: "JavaScript: The good parts" },
  ]);
  const [carts, setCarts] = useState<{ id: number; title: string }[]>([]);

  const addToCart = async (id: number) => {
    const addedItem = [...items].find((item) => item.id === id);

    if (addedItem) {
      if (carts.some((cart) => cart.id === addedItem.id)) return;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCarts((prev) => [...prev, addedItem]);
    }
  };

  return (
    <>
      <Carts carts={carts} />
      <br />

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <CartForm key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default CartList;
