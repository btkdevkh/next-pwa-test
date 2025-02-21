"use client";

import { useEffect, useState } from "react";
import ReactSelect from "./ReactSelect";
import {
  ColorEnum,
  Indicator,
  indicatorDBData,
  indicatorMockedData,
  OptionTypeIndicator,
} from "../../../data/mockedData";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const IndicatorList = () => {
  const formatIndicatorData = indicatorMockedData
    .map((indicatorMockedDatum) => {
      for (const indicatorDBDatum of indicatorDBData) {
        if (
          indicatorMockedDatum.nom.toLowerCase() ===
          indicatorDBDatum.nom.toLowerCase()
        ) {
          return {
            ...indicatorMockedDatum,
            id: indicatorDBDatum.id,
            id_axe: indicatorDBDatum.id_axe,
          };
        } else {
          return {
            ...indicatorMockedDatum,
          };
        }
      }
    })
    .filter((f) => f != undefined);

  const indicatorOptions: OptionTypeIndicator[] = formatIndicatorData.map(
    (indicatorMockedDatum) => {
      return {
        id: indicatorMockedDatum.id,
        label: indicatorMockedDatum.nom,
        value: indicatorMockedDatum.nom,
        color: null,
        id_axe: indicatorMockedDatum.id_axe,
      };
    }
  );

  const [count, setCount] = useState(1);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [parentOptions, setParentOptions] = useState<
    OptionTypeIndicator[] | null
  >(indicatorOptions);

  // Add indicator
  const handleAddIndicator = () => {
    setCount((prev) => prev + 1);

    if (count > 3) {
      setCount(4);
      toast.error("You can't add more than 3 indicators.");
      return;
    }
  };

  // Remove indicator
  const handleRemoveIndicator = (index: number) => {
    setCount((prev) => prev - 1);

    if (count === 1) {
      setCount(1);
      return;
    }

    if (indicators.length === 0) {
      return;
    }

    setIndicators((prev) => {
      const newIndicators = [...prev];
      newIndicators.splice(index, 1);
      return newIndicators;
    });
  };

  // Max 3 indicators
  useEffect(() => {
    if (count > 3) {
      toast.error("You can't add more than 3 indicators.");
    }
  }, [count]);

  // console.log("indicatorDBData :", indicatorDBData);
  // console.log("indicatorMockedData :", indicatorMockedData);
  // console.log("formatIndicatorData :", formatIndicatorData);
  // console.log("count :", count);
  // console.log("parentOptions :", parentOptions);
  console.log("indicatorOptions :", indicatorOptions);
  console.log("indicators :", indicators);

  return (
    <div className="flex flex-col gap-5 items-center">
      <button onClick={handleAddIndicator}>
        <FaPlus size={20} color="white" />
      </button>

      <div className="flex flex-col gap-1 w-full">
        {Array.from({ length: count }).map((_, index) => {
          const colorKey = `COLOR_${index + 1}` as keyof typeof ColorEnum;
          const indicatorColor = ColorEnum[colorKey];

          return (
            <div key={index}>
              <ReactSelect
                index={index}
                count={count}
                indicatorColor={indicatorColor}
                parentOptions={parentOptions}
                indicatorOptions={indicatorOptions}
                indicators={indicators}
                setIndicators={setIndicators}
                handleRemoveIndicator={handleRemoveIndicator}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorList;
