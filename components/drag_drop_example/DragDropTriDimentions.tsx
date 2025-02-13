"use client";

import { Category } from "@/models/Category";
import DragDropHorizontal from "@/components/drag_drop_example/DragDropHorizontal";

const DragDropTriDimentions = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-around gap-1 mb-1">
          {["À Faire", "En Cours", "Achevé"].map((title) => (
            <div
              className={`${
                title === "À Faire"
                  ? "bg-orange-500"
                  : title === "En Cours"
                  ? "bg-blue-500"
                  : title === "Achevé"
                  ? "bg-green-500"
                  : ""
              } text-center w-full p-2`}
              key={title}
            >
              <h2>{title.toUpperCase()}</h2>
            </div>
          ))}
        </div>
        <hr />
        <br />

        {data.map((datums, index) => (
          <DragDropHorizontal key={index} data={datums} />
        ))}
      </div>
    </div>
  );
};

export default DragDropTriDimentions;

const data: Category[][] = [
  [
    {
      id: 1,
      data: [{ id: 1, text: "Les courses", done: false }],
    },
    {
      id: 2,
      data: [],
    },
    {
      id: 3,
      data: [],
    },
  ],
];
