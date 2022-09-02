import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedBarSeries,
  XYChart,
  Tooltip
} from "@visx/xychart";
import { useState } from "react";

const data = {
  data1: [
    { x: "2020-01-01", y: 50 },
    { x: "2020-01-02", y: 10 },
    { x: "2020-01-03", y: 20 }
  ],
  data2: [
    { x: "2020-01-01", y: 30 },
    { x: "2020-01-02", y: 40 },
    { x: "2020-01-03", y: 80 }
  ],
  data3: [
    { x: "2020-01-01", y: 30 },
    { x: "2020-01-02", y: 40 },
    { x: "2020-01-03", y: 80 },
    { x: "2020-01-034", y: 100 }
  ]
};

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y
};

export default function App() {
  const [dataChart, setDataChart] = useState("data1");

  const handleChange = (e) => {
    setDataChart(e.target.value);
  };

  return (
    <>
      <div>
        <input
          type="radio"
          value="data1"
          checked={dataChart === "data1"}
          onChange={handleChange}
        />
        Data 1
        <input
          type="radio"
          value="data2"
          checked={dataChart === "data2"}
          onChange={handleChange}
        />
        Data 2
        <input
          type="radio"
          value="data3"
          checked={dataChart === "data3"}
          onChange={handleChange}
        />
        Data 3
      </div>
      <XYChart
        height={300}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedBarSeries
          dataKey="Line 2"
          data={data[dataChart]}
          {...accessors}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {", "}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart>
    </>
  );
}
