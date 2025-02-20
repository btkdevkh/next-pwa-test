"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Indicator,
  indicatorOptions,
  OptionTypeIndicator,
} from "../../../data/mockedData";
import { FaTrash } from "react-icons/fa";

const SingleSelect = dynamic(() => import("react-select"), { ssr: false });

type ReactSelectProps = {
  index: number;
  count: number;
  indicator: Indicator | null;
  indicatorColor: string;
  parentOptions: OptionTypeIndicator[] | null;
  setParentOptions: Dispatch<SetStateAction<OptionTypeIndicator[] | null>>;
  setIndicators: Dispatch<SetStateAction<Indicator[]>>;
  handleRemoveIndicator: (index: number, id?: string | number | null) => void;
  formatIndicatorData: Indicator[];
};

const ReactSelect = ({
  index,
  count,
  indicator,
  indicatorColor,
  parentOptions,
  setIndicators,
  setParentOptions,
  handleRemoveIndicator,
  formatIndicatorData,
}: ReactSelectProps) => {
  const [color, setColor] = useState<string>(indicatorColor ?? "");
  const [selectedOption, setSelectedOption] =
    useState<OptionTypeIndicator | null>(null);
  const [_, setOptions] = useState<OptionTypeIndicator[] | null>(
    indicatorOptions
  );

  const handleSelectedOption = (option: OptionTypeIndicator | null) => {
    if (option) {
      // Update the selected option by child select
      setSelectedOption(option);

      // Update child option individually
      setOptions((prevs) =>
        (prevs as OptionTypeIndicator[])?.filter(
          (prev) => prev.id !== option.id
        )
      );

      // Update parent options
      setParentOptions((prevs) =>
        (prevs as OptionTypeIndicator[])?.filter(
          (prev) => prev.id !== option.id
        )
      );
    }
  };

  console.log("color :", color);
  console.log("selectedOption :", selectedOption);

  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <div className="w-full">
        <SingleSelect
          options={parentOptions ?? []}
          value={selectedOption}
          onChange={(option) =>
            handleSelectedOption(option as OptionTypeIndicator)
          }
        />
      </div>

      <button onClick={() => handleRemoveIndicator(index, indicator?.id)}>
        <FaTrash size={20} color="red" />
      </button>
    </div>
  );
};

export default ReactSelect;
