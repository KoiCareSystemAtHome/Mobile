import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 100;
const CHART_HEIGHT = 200;
const PADDING = 40;

// Default data if fishReportInfos is empty
const defaultData = [
  { weight: 5, size: 10, calculatedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
  { weight: 8, size: 12, calculatedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
  { weight: 15, size: 15, calculatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  { weight: 10, size: 13, calculatedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
  { weight: 12, size: 18, calculatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
  { weight: 20, size: 22, calculatedDate: new Date().toISOString() },
];

const GrowthChart = ({ fishReportInfos }) => {
  // Ensure fishReportInfos is an array and has the expected properties
  const data = Array.isArray(fishReportInfos) && fishReportInfos.length > 0 
    ? fishReportInfos 
    : defaultData;

  const MAX_Y_VALUE = 50;
  const yAxisInterval = 10;

  // Filter data for the last 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const filteredData = data.filter(item => new Date(item.calculatedDate) >= threeMonthsAgo);

  // Sort data by date
  filteredData.sort((a, b) => new Date(a.calculatedDate) - new Date(b.calculatedDate));

  // Get min and max dates for scaling
  const dates = filteredData.map(item => new Date(item.calculatedDate).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const dateRange = maxDate - minDate || 1; // Avoid division by zero

  const normalizeData = (data, property) =>
    data.map((d) => {
      const dateValue = new Date(d.calculatedDate).getTime();
      return {
        x: (dateRange > 0)
          ? PADDING + ((dateValue - minDate) / dateRange) * (CHART_WIDTH - PADDING * 2)
          : CHART_WIDTH / 2,
        y: (1 - d[property] / MAX_Y_VALUE) * (CHART_HEIGHT - PADDING * 2) + PADDING,
      };
    });

  const weightPoints = normalizeData(filteredData, 'weight');
  const sizePoints = normalizeData(filteredData, 'size');

  // Generate Y-axis labels
  const yAxisLabels = [];
  for (let i = 0; i <= MAX_Y_VALUE; i += yAxisInterval) {
    const yPosition = (1 - i / MAX_Y_VALUE) * (CHART_HEIGHT - PADDING * 2) + PADDING;
    yAxisLabels.push({ value: i, y: yPosition });
  }

  // Generate X-axis labels (show approximately 4-5 dates)
  const xAxisLabels = [];
  const numLabels = Math.min(filteredData.length, 5);
  const step = Math.max(1, Math.floor(filteredData.length / numLabels));
  for (let i = 0; i < filteredData.length; i += step) {
    const date = new Date(filteredData[i].calculatedDate);
    const label = `${date.getDate()}/${date.getMonth() + 1}`;
    const xPosition = weightPoints[i].x;
    xAxisLabels.push({ value: label, x: xPosition });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Weight and Size Growth Chart</Text>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 20} style={styles.chart}>
        {/* Y-axis labels */}
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

        {/* X-axis labels */}
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

        {/* Y-axis line */}
        <Line
          x1={PADDING}
          y1={PADDING}
          x2={PADDING}
          y2={CHART_HEIGHT - PADDING}
          stroke="gray"
          strokeWidth="1"
        />

        {/* X-axis line */}
        <Line
          x1={PADDING}
          y1={CHART_HEIGHT - PADDING}
          x2={CHART_WIDTH - PADDING}
          y2={CHART_HEIGHT - PADDING}
          stroke="gray"
          strokeWidth="1"
        />

        {/* Weight Line (Blue) */}
        {weightPoints.map((point, index) =>
          index > 0 ? (
            <Line
              key={`weight-${index}`}
              x1={weightPoints[index - 1].x}
              y1={weightPoints[index - 1].y}
              x2={point.x}
              y2={point.y}
              stroke="blue"
              strokeWidth="2"
            />
          ) : null
        )}

        {/* Size Line (Green) */}
        {sizePoints.map((point, index) =>
          index > 0 ? (
            <Line
              key={`size-${index}`}
              x1={sizePoints[index - 1].x}
              y1={sizePoints[index - 1].y}
              x2={point.x}
              y2={point.y}
              stroke="green"
              strokeWidth="2"
            />
          ) : null
        )}

        {/* Weight Points (Blue) */}
        {weightPoints.map((point, index) => (
          <Circle 
            key={`weight-point-${index}`} 
            cx={point.x} 
            cy={point.y} 
            r="4" 
            fill="blue" 
          />
        ))}

        {/* Size Points (Green) */}
        {sizePoints.map((point, index) => (
          <Circle 
            key={`size-point-${index}`} 
            cx={point.x} 
            cy={point.y} 
            r="4" 
            fill="green" 
          />
        ))}
      </Svg>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
          <Text>Weight (kg)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'green' }]} />
          <Text>Size (cm)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chart: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  legend: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default GrowthChart;