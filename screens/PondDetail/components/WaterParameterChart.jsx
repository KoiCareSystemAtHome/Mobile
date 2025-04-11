import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 60;
const CHART_HEIGHT = 200;
const PADDING = 40;

const parameterColors = {
  "pH Level": "#1E90FF",
  "Nitrates (NO3-)": "#FF4500",
  "Clo": "#4682B4",
  "Salt": "#32CD32",
  "PH": "#FF69B4",
  "Hardness": "#9400D3",
  "Amonium (NH4+)": "#FFD700",
  "Mật độ cá nhỏ": "#8A2BE2",
  "Mật độ cá lớn": "#FFA500",
  "Photphat (Po4)": "#ADFF2F",
  "Nitrites": "#FF8C00",
  "Độ cứng KH": "#FF0000",
  "CO2": "#00CED1",
  "Amoniac (NH3)": "#FFD700",
};

const WaterParametersChart = ({ selectedParameters = [], waterParameterData, pondParameters }) => {
  console.log("Selected Parameters:", selectedParameters);
  console.log("Water Parameter Data:", waterParameterData);
  console.log("Pond Parameters:", pondParameters);

  const data = Array.isArray(waterParameterData) && waterParameterData.length > 0
    ? waterParameterData
    : [];

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const filteredData = data.filter(item => new Date(item.calculatedDate) >= threeMonthsAgo);
  filteredData.sort((a, b) => new Date(a.calculatedDate) - new Date(b.calculatedDate));

  console.log("Filtered Data:", filteredData);

  const dates = filteredData.map(item => new Date(item.calculatedDate).getTime());
  const minDate = dates.length > 0 ? Math.min(...dates) : Date.now();
  const maxDate = dates.length > 0 ? Math.max(...dates) : Date.now();
  const dateRange = maxDate - minDate || 1;

  const normalizeData = (data, property, maxYValue) => {
    const validData = data.filter(d => d.hasOwnProperty(property) && d[property] != null);
    console.log(`Normalizing data for ${property}:`, validData);
    return validData.map((d) => {
      const dateValue = new Date(d.calculatedDate).getTime();
      const value = d[property];
      return {
        x: (dateRange > 0)
          ? PADDING + ((dateValue - minDate) / dateRange) * (CHART_WIDTH - PADDING * 2)
          : CHART_WIDTH / 2,
        y: maxYValue ? (1 - value / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING : PADDING,
      };
    });
  };

  const getChartConfig = (parameter) => {
    const paramInfo = pondParameters.find(p => p.parameterName === parameter);
    let maxYValue = 50; // Default
    let yAxisInterval = 10;

    if (paramInfo) {
      const bounds = [
        paramInfo.warningLower,
        paramInfo.warningUpper,
        paramInfo.dangerLower,
        paramInfo.dangerUpper
      ].filter(val => val !== null && val !== undefined);
      
      if (bounds.length > 0) {
        maxYValue = Math.max(...bounds) * 1.2; // Add 20% padding
        yAxisInterval = Math.ceil(maxYValue / 5);
      }
    }

    return { maxYValue, yAxisInterval };
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      {selectedParameters.length === 0 ? (
        <Text style={styles.noDataText}>Select parameters to display</Text>
      ) : (
        selectedParameters.map((parameter) => {
          const { maxYValue, yAxisInterval } = getChartConfig(parameter);
          const points = normalizeData(filteredData, parameter, maxYValue);

          console.log(`Points for ${parameter}:`, points);

          const yAxisLabels = [];
          for (let i = 0; i <= maxYValue; i += yAxisInterval) {
            const yPosition = (1 - i / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING;
            yAxisLabels.push({ value: i.toFixed(1), y: yPosition });
          }

          const xAxisLabels = [];
          const numLabels = Math.min(filteredData.length, 5);
          const step = Math.max(1, Math.floor(filteredData.length / numLabels));
          for (let i = 0; i < filteredData.length; i += step) {
            const date = new Date(filteredData[i].calculatedDate);
            const label = `${date.getDate()}/${date.getMonth() + 1}`;
            const xPosition = points[i]?.x || PADDING;
            xAxisLabels.push({ value: label, x: xPosition });
          }

          const paramInfo = pondParameters.find(p => p.parameterName === parameter);
          const warningLowerY = paramInfo?.warningLower != null 
            ? (1 - paramInfo.warningLower / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING
            : null;
          const warningUpperY = paramInfo?.warningUpper != null
            ? (1 - paramInfo.warningUpper / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING
            : null;
          const dangerLowerY = paramInfo?.dangerLower != null
            ? (1 - paramInfo.dangerLower / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING
            : null;
          const dangerUpperY = paramInfo?.dangerUpper != null
            ? (1 - paramInfo.dangerUpper / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING
            : null;

          return (
            <View key={parameter} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{parameter}</Text>
              <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 40}>
                {/* Y-axis labels */}
                {yAxisLabels.map((label, index) => (
                  <SvgText
                    key={`y-label-${parameter}-${index}`}
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
                    key={`x-label-${parameter}-${index}`}
                    x={label.x}
                    y={CHART_HEIGHT - PADDING + 30}
                    fontSize="12"
                    fill="black"
                    textAnchor="middle"
                  >
                    {label.value}
                  </SvgText>
                ))}
                {/* Axes */}
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
                {/* Warning and Danger Lines */}
                {warningLowerY && (
                  <Line
                    x1={PADDING}
                    y1={warningLowerY}
                    x2={CHART_WIDTH - PADDING}
                    y2={warningLowerY}
                    stroke="#FFD700"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                )}
                {warningUpperY && (
                  <Line
                    x1={PADDING}
                    y1={warningUpperY}
                    x2={CHART_WIDTH - PADDING}
                    y2={warningUpperY}
                    stroke="#FFD700"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                )}
                {dangerLowerY && (
                  <Line
                    x1={PADDING}
                    y1={dangerLowerY}
                    x2={CHART_WIDTH - PADDING}
                    y2={dangerLowerY}
                    stroke="#FF0000"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                )}
                {dangerUpperY && (
                  <Line
                    x1={PADDING}
                    y1={dangerUpperY}
                    x2={CHART_WIDTH - PADDING}
                    y2={dangerUpperY}
                    stroke="#FF0000"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                )}
                {/* Data Lines and Points */}
                {points.map((point, index) =>
                  index > 0 ? (
                    <Line
                      key={`${parameter}-line-${index}`}
                      x1={points[index - 1].x}
                      y1={points[index - 1].y}
                      x2={point.x}
                      y2={point.y}
                      stroke={parameterColors[parameter] || "#000000"}
                      strokeWidth="2"
                    />
                  ) : null
                )}
                {points.map((point, index) => (
                  <Circle
                    key={`${parameter}-point-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={parameterColors[parameter] || "#000000"}
                  />
                ))}
              </Svg>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: CHART_HEIGHT + 80, // Ensure enough space for chart + title + labels
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    padding: 20,
  },
});

export default WaterParametersChart;