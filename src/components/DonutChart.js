import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const DonutChart = props => {
  const data = props.colorPercentages.map(cp => ({
    x: `${cp.percent * 100}%\n${cp.color}`,
    y: cp.percent
  }));

  const colorScale = props.colorPercentages.map(cp => cp.color);

  return (
    <div>
      <svg width="400" height="400">
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={data}
          innerRadius={68}
          labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "white" } }}
          colorScale={colorScale}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={200}
          y={200}
          text="100%"
        />
      </svg>
    </div>
  );
};

export default DonutChart;
