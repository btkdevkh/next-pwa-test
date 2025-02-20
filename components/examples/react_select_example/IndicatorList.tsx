"use client";

import { useEffect, useState } from "react";
import ReactSelect from "./ReactSelect";
import {
  ColorEnum,
  Indicator,
  indicatorDBData,
  indicatorMockedData,
  indicatorOptions,
  OptionTypeIndicator,
} from "../../../data/mockedData";
import { FaPlus } from "react-icons/fa";

const IndicatorList = () => {
  // Format the main indicator data
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

  // By default count = 1
  const [count, setCount] = useState(1);

  // By default, set the first indicator
  const [indicators, setIndicators] = useState<Indicator[]>([
    formatIndicatorData[0],
  ]);

  // Parent select options to track the option state when
  // the child select has chosen the selected option
  const [parentOptions, setParentOptions] = useState<
    OptionTypeIndicator[] | null
  >(indicatorOptions);

  // Add indicator
  const handleAddIndicator = () => {
    setCount((prev) => prev + 1);

    if (count >= formatIndicatorData.length) {
      // Update count
      setCount(formatIndicatorData.length);
      return;
    }

    if (indicators.length > 0) {
      // Update indicators
      setIndicators((prevs) => {
        return [...(prevs as Indicator[]), formatIndicatorData[count]];
      });
    }
  };

  // Remove indicator
  const handleRemoveIndicator = (
    index: number,
    id?: string | number | null
  ) => {
    const found = formatIndicatorData.find(
      (indicatorMockedDatum) => indicatorMockedDatum.id === id
    );

    if (found) {
      const index = formatIndicatorData.indexOf(found);

      // Update count
      setCount(index);

      // Update parent options
      setParentOptions((prevs) => [
        ...(prevs as OptionTypeIndicator[]),
        indicatorOptions[index],
      ]);
    }

    // Update indicators
    setIndicators((prevs) => {
      return [...(prevs as Indicator[]).filter((prev) => prev.id !== id)];
    });
  };

  useEffect(() => {
    if (indicators.length === 0) {
      setCount(1);
    }
  }, [indicators]);

  console.log("indicatorDBData :", indicatorDBData);
  console.log("indicatorMockedData :", indicatorMockedData);
  console.log("formatIndicatorData :", formatIndicatorData);
  console.log("-----------------------------------");
  console.log("count :", count);
  console.log("indicators :", indicators);
  console.log("parentOptions :", parentOptions);

  return (
    <div className="flex flex-col gap-5 items-center">
      <button onClick={handleAddIndicator}>
        <FaPlus size={20} color="white" />
      </button>

      <div className="flex flex-col gap-1 w-full">
        {indicators &&
          indicators.length > 0 &&
          indicators.map((indicator, index) => {
            const colorKey = `COLOR_${count}` as keyof typeof ColorEnum;
            const indicatorColor = ColorEnum[colorKey];

            return (
              <div key={indicator.id}>
                <ReactSelect
                  index={index}
                  count={count}
                  indicator={indicator}
                  indicatorColor={indicatorColor}
                  parentOptions={parentOptions}
                  setParentOptions={setParentOptions}
                  setIndicators={setIndicators}
                  handleRemoveIndicator={handleRemoveIndicator}
                  formatIndicatorData={formatIndicatorData}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default IndicatorList;
