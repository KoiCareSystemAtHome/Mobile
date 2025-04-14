import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.55)", // Slightly lighter for a brighter feel
  },
  container: {
    flex: 1,
    paddingHorizontal: 24, // Increased for better spacing
    paddingTop: 60,
    backgroundColor: "rgba(240, 248, 255, 0.15)", // Subtle blue tint for depth
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent for a clean header
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 24,
    alignItems: "flex-start", // Left-aligned for modern hierarchy
  },
  userText: {
    fontSize: 30, // Slightly larger for prominence
    fontWeight: "700",
    color: "#1E3A8A", // Deep blue for elegance
    letterSpacing: 0.5,
  },
  depositCard: {
    marginBottom: 24,
    borderRadius: 18, // Softer corners
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  depositGradient: {
    padding: 18,
    backgroundColor: "#60A5FA", // Fallback for gradient
  },
  depositHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  depositText: {
    fontSize: 26, // Larger for emphasis
    color: "#FFFFFF",
    fontWeight: "700",
  },
  amount: {
    fontWeight: "800",
  },
  currency: {
    fontSize: 18,
    fontWeight: "400",
  },
  depositLink: {
    color: "#FFD700", // Gold for koi-inspired accent
    fontSize: 17,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  cardDescription: {
    color: "#E6F0FA", // Light blue-white for readability
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 22, // Slightly larger for hierarchy
    fontWeight: "600",
    color: "#1E3A8A", // Deep blue for consistency
  },
  badge: {
    marginLeft: 10,
    backgroundColor: "#ff4d4f",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B4FBE2", // Unchanged
    width: "48%",
    marginBottom: 15,
    borderWidth: 0,
    color: "black",
    height: 60,
    borderRadius: 20,
  },
  pondButton: {
    backgroundColor: "#7EABC5", // Unchanged
    width: "48%",
    marginBottom: 15,
    borderWidth: 0,
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 260, // Slightly wider for comfort
    backgroundColor: "#E6F0FA", // Light blue for a fresh, water-like feel
    paddingHorizontal: 20,
    paddingVertical: 36,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  drawerHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  drawerProfile: {
    alignItems: "center",
    marginTop: 10,
  },
  drawerUserName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E3A8A", // Deep blue for consistency
    marginTop: 12,
  },
  drawerUserRole: {
    fontSize: 14,
    color: "#4B5563", // Neutral gray for secondary text
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 20,
  },
  drawerItemImage: {
    width: 22,
    height: 22, // Slightly larger for clarity
    tintColor: "#1E3A8A", // Match theme
  },
  drawerItems: {
    marginTop: 16,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle white for layering
  },
  drawerItemText: {
    marginLeft: 14,
    fontSize: 16,
    color: "#1E3A8A",
    fontWeight: "500",
  },
  tooltipContainer: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tooltipOption: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tooltipText: {
    fontSize: 16,
    color: "#1E3A8A",
    fontWeight: "500",
  },
  tooltipDivider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 4,
  },
});