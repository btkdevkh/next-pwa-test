"use client";

import { ResponsiveLine } from "@nivo/line";

const NivoResponsiveLine = () => {
  return (
    <div className="text-black h-[25rem]">
      <ResponsiveLine
        data={data_line}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
      />
    </div>
  );
};

export default NivoResponsiveLine;

const data_line = [
  {
    id: "japan",
    color: "hsl(214, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 93,
      },
      {
        x: "helicopter",
        y: 232,
      },
      {
        x: "boat",
        y: 122,
      },
      {
        x: "train",
        y: 55,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 68,
      },
      {
        x: "car",
        y: 192,
      },
      {
        x: "moto",
        y: 223,
      },
      {
        x: "bicycle",
        y: 128,
      },
      {
        x: "horse",
        y: 290,
      },
      {
        x: "skateboard",
        y: 134,
      },
      {
        x: "others",
        y: 46,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(261, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 230,
      },
      {
        x: "helicopter",
        y: 198,
      },
      {
        x: "boat",
        y: 78,
      },
      {
        x: "train",
        y: 292,
      },
      {
        x: "subway",
        y: 171,
      },
      {
        x: "bus",
        y: 123,
      },
      {
        x: "car",
        y: 113,
      },
      {
        x: "moto",
        y: 229,
      },
      {
        x: "bicycle",
        y: 204,
      },
      {
        x: "horse",
        y: 255,
      },
      {
        x: "skateboard",
        y: 28,
      },
      {
        x: "others",
        y: 212,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(58, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 83,
      },
      {
        x: "helicopter",
        y: 214,
      },
      {
        x: "boat",
        y: 43,
      },
      {
        x: "train",
        y: 126,
      },
      {
        x: "subway",
        y: 56,
      },
      {
        x: "bus",
        y: 269,
      },
      {
        x: "car",
        y: 228,
      },
      {
        x: "moto",
        y: 125,
      },
      {
        x: "bicycle",
        y: 131,
      },
      {
        x: "horse",
        y: 298,
      },
      {
        x: "skateboard",
        y: 1,
      },
      {
        x: "others",
        y: 156,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(101, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 236,
      },
      {
        x: "helicopter",
        y: 34,
      },
      {
        x: "boat",
        y: 162,
      },
      {
        x: "train",
        y: 16,
      },
      {
        x: "subway",
        y: 245,
      },
      {
        x: "bus",
        y: 227,
      },
      {
        x: "car",
        y: 249,
      },
      {
        x: "moto",
        y: 263,
      },
      {
        x: "bicycle",
        y: 260,
      },
      {
        x: "horse",
        y: 230,
      },
      {
        x: "skateboard",
        y: 130,
      },
      {
        x: "others",
        y: 199,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(136, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 58,
      },
      {
        x: "helicopter",
        y: 43,
      },
      {
        x: "boat",
        y: 66,
      },
      {
        x: "train",
        y: 47,
      },
      {
        x: "subway",
        y: 58,
      },
      {
        x: "bus",
        y: 270,
      },
      {
        x: "car",
        y: 83,
      },
      {
        x: "moto",
        y: 9,
      },
      {
        x: "bicycle",
        y: 67,
      },
      {
        x: "horse",
        y: 137,
      },
      {
        x: "skateboard",
        y: 19,
      },
      {
        x: "others",
        y: 284,
      },
    ],
  },
];
