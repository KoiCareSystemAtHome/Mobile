import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 200;
const PADDING = 50;
const LABEL_WIDTH = 40;

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
  pondParameters,
}) => {
  if (!Array.isArray(waterParameterData)) {
    console.warn("waterParameterData is not an array");
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Dữ liệu không hợp lệ</Text>
      </View>
    );
  }

  const data = waterParameterData.length > 0 ? waterParameterData : [];

  // Memoize filteredData to prevent recomputation
  const filteredData = useMemo(() => {
    const threeMonthsAgo = dayjs().subtract(3, 'month').startOf('day');
    return data
      .filter((item) => {
        if (!item.calculatedDate || typeof item.calculatedDate !== "string") {
          console.warn("Invalid calculatedDate:", item);
          return false;
        }
        try {
          const date = dayjs.utc(item.calculatedDate);
          return date.isAfter(threeMonthsAgo) && date.isValid();
        } catch (error) {
          console.warn("Error parsing calculatedDate:", item.calculatedDate);
          return false;
        }
      })
      .sort((a, b) => dayjs.utc(a.calculatedDate).valueOf() - dayjs.utc(b.calculatedDate).valueOf());
  }, [data]);

  const normalizeData = (data, property, maxYValue) => {
    const validData = data.filter(
      (d) => d.hasOwnProperty(property) && d[property] != null
    );

    if (validData.length === 0) return [];

    // Group data by date for same-day handling
    const dayMap = {};
    validData.forEach((d, index) => {
      const date = dayjs.utc(d.calculatedDate);
      const dayKey = date.format('YYYY-MM-DD');
      if (!dayMap[dayKey]) {
        dayMap[dayKey] = [];
      }
      dayMap[dayKey].push(index);
    });

    // Get unique dates for X-axis scaling
    const uniqueDates = [
      ...new Set(
        validData.map((item) => dayjs.utc(item.calculatedDate).format('YYYY-MM-DD'))
      ),
    ]
      .map((dateStr) => dayjs.utc(dateStr).valueOf())
      .sort((a, b) => a - b);

    const minDate = uniqueDates.length > 0 ? Math.min(...uniqueDates) : dayjs.utc().valueOf();
    const maxDate = uniqueDates.length > 0 ? Math.max(...uniqueDates) : dayjs.utc().valueOf();
    const dateRange = maxDate - minDate || 1;

    return validData.map((d, index) => {
      const date = dayjs.utc(d.calculatedDate);
      const dayKey = date.format('YYYY-MM-DD');
      const dateValue = date.valueOf();
      const value = d[property];

      // Base X position based on date
      let x = uniqueDates.length > 1
        ? PADDING + ((dateValue - minDate) / dateRange) * (CHART_WIDTH - PADDING * 2)
        : CHART_WIDTH / 2;

      // Adjust X position for same-day points
      const pointsOnSameDay = dayMap[dayKey];
      if (pointsOnSameDay.length > 1) {
        const position = pointsOnSameDay.indexOf(index);
        const totalPoints = pointsOnSameDay.length;
        const offsetStep = 10; // Small offset to separate points
        const maxOffset = (totalPoints - 1) * offsetStep;
        const startOffset = -(maxOffset / 2);
        x += startOffset + position * offsetStep;
      }

      // Ensure X is within chart bounds
      x = Math.max(PADDING, Math.min(CHART_WIDTH - PADDING, x));

      // Calculate Y position
      const y = maxYValue
        ? (1 - value / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING
        : CHART_HEIGHT - PADDING;

      return { x, y, date: dateValue, value };
    });
  };

  const getChartConfig = (parameter) => {
    const paramInfo = pondParameters.find((p) => p.parameterName === parameter);
    let maxYValue = 50;
    let yAxisInterval = 10;

    if (paramInfo) {
      const bounds = [
        paramInfo.warningLower,
        paramInfo.warningUpper,
        paramInfo.dangerLower,
        paramInfo.dangerUpper,
      ].filter((val) => val !== null && val !== undefined);

      const maxDataValue = Math.max(
        ...filteredData
          .filter((d) => d.hasOwnProperty(parameter) && d[parameter] != null)
          .map((d) => d[parameter]),
        0
      );

      if (bounds.length > 0 || maxDataValue > 0) {
        maxYValue = Math.max(...bounds, maxDataValue) * 1.2 || 50;
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
        <Text style={styles.noDataText}>Hãy chọn 1 thông số</Text>
      ) : (
        selectedParameters.map((parameter) => {
          const { maxYValue, yAxisInterval } = getChartConfig(parameter);
          const points = normalizeData(filteredData, parameter, maxYValue);

          if (points.length === 0) {
            return (
              <View key={parameter} style={styles.chartContainer}>
                <Text style={styles.chartTitle}>{parameter}</Text>
                <Text style={styles.noDataText}>Không có dữ liệu cho {parameter}</Text>
              </View>
            );
          }

          const yAxisLabels = [];
          for (let i = 0; i <= maxYValue; i += yAxisInterval) {
            const yPosition =
              (1 - i / maxYValue) * (CHART_HEIGHT - PADDING * 2) + PADDING;
            yAxisLabels.push({ value: i.toFixed(1), y: yPosition });
          }

          // Generate X-axis labels
          const uniquePointDates = [
            ...new Set(
              points.map((point) => dayjs.utc(point.date).format('YYYY-MM-DD'))
            ),
          ]
            .map((dateStr) => ({
              date: dayjs.utc(dateStr).valueOf(),
              label: dayjs.utc(dateStr).format('DD/MM'),
            }))
            .sort((a, b) => a.date - b.date);

          const maxLabels = Math.min(5, uniquePointDates.length);
          const step = uniquePointDates.length > maxLabels ? Math.ceil(uniquePointDates.length / maxLabels) : 1;
          const xAxisLabels = uniquePointDates
            .filter((_, index) => index % step === 0 || index === uniquePointDates.length - 1)
            .map((item) => {
              const x = uniquePointDates.length > 1
                ? PADDING +
                  ((item.date - Math.min(...uniquePointDates.map(d => d.date))) /
                    (Math.max(...uniquePointDates.map(d => d.date)) - Math.min(...uniquePointDates.map(d => d.date)) || 1)) *
                    (CHART_WIDTH - PADDING * 2)
                : CHART_WIDTH / 2;
              return { value: item.label, x };
            });

          const paramInfo = pondParameters.find(
            (p) => p.parameterName === parameter
          );
          const warningLowerY =
            paramInfo?.warningLower != null
              ? (1 - paramInfo.warningLower / maxYValue) *
                  (CHART_HEIGHT - PADDING * 2) +
                PADDING
              : null;
          const warningUpperY =
            paramInfo?.warningUpper != null
              ? (1 - paramInfo.warningUpper / maxYValue) *
                  (CHART_HEIGHT - PADDING * 2) +
                PADDING
              : null;
          const dangerLowerY =
            paramInfo?.dangerLower != null
              ? (1 - paramInfo.dangerLower / maxYValue) *
                  (CHART_HEIGHT - PADDING * 2) +
                PADDING
              : null;
          const dangerUpperY =
            paramInfo?.dangerUpper != null
              ? (1 - paramInfo.dangerUpper / maxYValue) *
                  (CHART_HEIGHT - PADDING * 2) +
                PADDING
              : null;

          return (
            <View key={parameter} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{parameter}</Text>
              <Svg width={CHART_WIDTH + LABEL_WIDTH} height={CHART_HEIGHT + 40}>
                {/* Y-axis labels */}
                {yAxisLabels.map((label, index) => (
                  <SvgText
                    key={`y-label-${parameter}-${index}`}
                    x={LABEL_WIDTH - 10}
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
                    transform={`rotate(-45 ${label.x} ${
                      CHART_HEIGHT - PADDING + 30
                    })`}
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
    paddingHorizontal: 10,
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
    minHeight: CHART_HEIGHT + 80,
    overflow: "visible",
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