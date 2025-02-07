"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const Recharts = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-500 p-3">
          <p className="label">{`Fréquence rouille : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="mx-auto">
        <br />
        <div className="bg-slate-100 text-black">
          <div className="h-[35rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                margin={{
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid />
                <XAxis
                  angle={-45}
                  textAnchor="end"
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis
                  label={{
                    value: "Fréquence et intensité (%)",
                    angle: -90,
                    offset: -10,
                    position: "left",
                  }}
                />
                <Tooltip />
                {series.map((s) => (
                  <Line
                    dataKey="value"
                    data={s.data}
                    name={s.name}
                    key={s.name}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recharts;

const series = [
  {
    color: "#82ca9d",
    name: "Graphique 1",
    data: [
      { date: "01/01", value: 3 },
      { date: "02/01", value: 6 },
      { date: "03/01", value: 9 },
      { date: "04/01", value: 12 },
      { date: "05/01", value: 15 },
    ],
  },
  {
    color: "#8884d8",
    name: "Graphique 2",
    data: [
      { date: "01/01", value: 1 },
      { date: "02/01", value: 4 },
      { date: "03/01", value: 7 },
      { date: "04/01", value: 25 },
      { date: "05/01", value: 35 },
    ],
  },
  {
    name: "Graphique 3",
    data: [
      { date: "10/01", value: 1 },
      { date: "11/01", value: 15 },
      { date: "12/01", value: 35 },
    ],
  },
];
