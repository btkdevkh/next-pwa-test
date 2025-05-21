"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Indicator, OptionTypeIndicator } from "../../../data/mockedData";
import { FaTrash } from "react-icons/fa";
import { ActionMeta } from "react-select";
import { toast } from "react-toastify";

const SingleSelect = dynamic(() => import("react-select"), { ssr: false });

type ReactSelectProps = {
  index: number;
  count: number;
  indicatorColor: string;
  parentOptions: OptionTypeIndicator[] | null;
  indicators: Indicator[] | null;
  indicatorOptions: OptionTypeIndicator[];
  setIndicators: Dispatch<SetStateAction<Indicator[]>>;
  handleRemoveIndicator: (index: number) => void;
};

const ReactSelect = ({
  index,
  count,
  indicatorColor,
  parentOptions,
  indicators,
  setIndicators,
  indicatorOptions,
  handleRemoveIndicator,
}: ReactSelectProps) => {
  const [color, setColor] = useState<string>(indicatorColor ?? "");
  const [selectedOption, setSelectedOption] =
    useState<OptionTypeIndicator | null>(null);

  // Set selected option when indicators change
  useEffect(() => {
    if (indicators && indicators[index]) {
      const indicator = indicators[index];
      const option =
        indicatorOptions.find((opt) => opt.id === indicator.id) || null;
      setSelectedOption(option);
    } else {
      setSelectedOption(null);
    }
  }, [indicators, index, indicatorOptions]);

  // Update color when it changes
  useEffect(() => {
    if (color) {
      setIndicators((prev) => {
        const newIndicators = [...prev];
        newIndicators[index] = {
          ...newIndicators[index],
          color: color,
        };
        return newIndicators;
      });
    }
  }, [color, index, setIndicators]);

  // Handle selected option
  const handleSelectedOption = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    if (count > 3) return;

    const option = newValue as OptionTypeIndicator | null;

    if (option) {
      // Check for duplicate option
      const isDuplicate = indicators?.some(
        (indicator) => indicator.id === option.id
      );
      if (isDuplicate) {
        toast.error("This indicator is already selected.");
        return;
      }

      setSelectedOption(option);

      const newIndicator: Indicator = {
        id: option.id,
        id_axe: option.id_axe ?? null,
        nom: option.label ?? "",
        color: color,
      };

      // Update indicators with new indicator when selected change
      setIndicators((prev) => {
        const newIndicators = [...prev];
        newIndicators[index] = newIndicator;
        return newIndicators;
      });
    }
  };

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
          onChange={handleSelectedOption}
        />
      </div>

      <button onClick={() => handleRemoveIndicator(index)}>
        <FaTrash size={20} color="red" />
      </button>
    </div>
  );
};

export default ReactSelect;
