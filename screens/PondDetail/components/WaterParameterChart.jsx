import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 100;
const CHART_HEIGHT = 200;
const PADDING = 40;

const parameterColors = {
  "pH Level": "#1E90FF",
  "Nitrates (NO3-)": "#FF4500",
  Clo: "#4682B4",
  Salt: "#32CD32",
  PH: "#FF69B4",
  Hardness: "#9400D3",
  "Amonium (NH4+)": "#FFD700",
  "Mật độ cá nhỏ": "#8A2BE2",
  "Mật độ cá lớn": "#FFA500",
  "Photphat (Po4)": "#ADFF2F",
  Nitrites: "#FF8C00",
  "Độ cứng KH": "#FF0000",
  CO2: "#00CED1",
  "Amoniac (NH3)": "#FFD700",
};

const WaterParametersChart = ({
  selectedParameters = [],
  waterParameterData,
}) => {
  const data =
    Array.isArray(waterParameterData) && waterParameterData.length > 0
      ? waterParameterData
      : [];

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const filteredData = data.filter(
    (item) => new Date(item.calculatedDate) >= threeMonthsAgo
  );

  filteredData.sort(
    (a, b) => new Date(a.calculatedDate) - new Date(b.calculatedDate)
  );

  const dates = filteredData.map((item) =>
    new Date(item.calculatedDate).getTime()
  );
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const dateRange = maxDate - minDate || 1;

  const MAX_Y_VALUE = 50; // Adjust this based on your data range
  const yAxisInterval = 10;

  // Updated normalizeData to only include entries with the specified property
  const normalizeData = (data, property) => {
    // Filter data to only include entries that have the property
    const validData = data.filter(
      (d) => d.hasOwnProperty(property) && d[property] != null
    );

    return validData.map((d) => {
      const dateValue = new Date(d.calculatedDate).getTime();
      const value = d[property];
      return {
        x:
          dateRange > 0
            ? PADDING +
              ((dateValue - minDate) / dateRange) * (CHART_WIDTH - PADDING * 2)
            : CHART_WIDTH / 2,
        y: (1 - value / MAX_Y_VALUE) * (CHART_HEIGHT - PADDING * 2) + PADDING,
      };
    });
  };

  const parameterPoints = selectedParameters.reduce((acc, param) => {
    acc[param] = normalizeData(filteredData, param);
    return acc;
  }, {});

  const yAxisLabels = [];
  for (let i = 0; i <= MAX_Y_VALUE; i += yAxisInterval) {
    const yPosition =
      (1 - i / MAX_Y_VALUE) * (CHART_HEIGHT - PADDING * 2) + PADDING;
    yAxisLabels.push({ value: i, y: yPosition });
  }

  const xAxisLabels = [];
  const numLabels = Math.min(filteredData.length, 5);
  const step = Math.max(1, Math.floor(filteredData.length / numLabels));
  for (let i = 0; i < filteredData.length; i += step) {
    const date = new Date(filteredData[i].calculatedDate);
    const label = `${date.getDate()}/${date.getMonth() + 1}`;
    const xPosition = parameterPoints[selectedParameters[0]]?.[i]?.x || PADDING;
    xAxisLabels.push({ value: label, x: xPosition });
  }

  return (
    <View style={styles.container}>
      {selectedParameters.length === 0 ? (
        <Text style={styles.noDataText}>Select parameters to display</Text>
      ) : (
        <>
          <Svg
            width={CHART_WIDTH}
            height={CHART_HEIGHT + 20}
            style={styles.chart}
          >
            {yAxisLabels.map((label, index) => (
              <SvgText
                key={`y-label-${index}`}
                x={PADDING - 25}
                y={label.y + 5}
                fontSize="12"
                fill="black"
                textAnchor="end"
              >
                {label.value}
              </SvgText>
            ))}
            {xAxisLabels.map((label, index) => (
              <SvgText
                key={`x-label-${index}`}
                x={label.x}
                y={CHART_HEIGHT - PADDING + 20}
                fontSize="12"
                fill="black"
                textAnchor="middle"
              >
                {label.value}
              </SvgText>
            ))}
            <Line
              x1={PADDING}
              y1={PADDING}
              x2={PADDING}
              y2={CHART_HEIGHT - PADDING}
              stroke="gray"
              strokeWidth="1"
            />
            <Line
              x1={PADDING}
              y1={CHART_HEIGHT - PADDING}
              x2={CHART_WIDTH - PADDING}
              y2={CHART_HEIGHT - PADDING}
              stroke="gray"
              strokeWidth="1"
            />
            {selectedParameters.map((param) => {
              const points = parameterPoints[param];
              return (
                <React.Fragment key={param}>
                  {points.map((point, index) =>
                    index > 0 ? (
                      <Line
                        key={`${param}-line-${index}`}
                        x1={points[index - 1].x}
                        y1={points[index - 1].y}
                        x2={point.x}
                        y2={point.y}
                        stroke={parameterColors[param]}
                        strokeWidth="2"
                      />
                    ) : null
                  )}
                  {points.map((point, index) => (
                    <Circle
                      key={`${param}-point-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill={parameterColors[param]}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </Svg>
          <View style={styles.legend}>
            {selectedParameters.map((param) => (
              <View key={param} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: parameterColors[param] },
                  ]}
                />
                <Text>{param}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  chart: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default WaterParametersChart;
