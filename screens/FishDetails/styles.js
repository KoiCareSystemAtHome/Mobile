import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 50, 80, 0.4)", // Darker aquatic overlay
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto", // Replace with custom font if available
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  fishImage: {
    width: "95%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  detailsContainer: {
    width: "100%",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 4,
  },
  variety: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0077B6",
    marginBottom: 12,
  },
  pondPickerContainer: {
    flexDirection: "row", // Align picker and button side by side
    justifyContent: "flex-start", // Align children to the left
    alignItems: "center", // Vertically center the picker and button
    width: "70%", // Span the full width of the parent
    marginBottom: 12,
    alignSelf: "flex-start", 
    paddingInline:10
  },
  dropdown: {
    flex: 1, // Take up available space
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48, // Match input height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 150, // Ensure picker doesn't shrink too much
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    maxHeight: 200, // Limit dropdown height
  },
  dropdownText: {
    fontSize: 16,
    color: "#1A3C5A",
    fontWeight: "500",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#A0AEC0",
    fontWeight: "400",
  },
  savePondButton: {
    backgroundColor: "#0077B6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8, // Space between picker and button
    height: 48, // Match picker height
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  savePondButtonDisabled: {
    backgroundColor: "#A0AEC0",
    opacity: 0.6,
  },
  savePondButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
  },
  infoBlock: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0077B6",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A3C5A",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
  },
  picker: {
    width: 120,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 12,
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A3C5A",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 4,
  },
  cardLabel: {
    fontWeight: "600",
    color: "#0077B6",
  },
  sectionText: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 4,
  },
  sectionLabel: {
    fontWeight: "600",
    color: "#0077B6",
  },
  noDataText: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
    padding: 12,
  },
  noteText: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A3C5A",
    textAlign: "center",
    flex: 1,
  },
  modalCancelButton: {
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#1A3C5A",
    backgroundColor: "#fff",
    marginBottom: 12,
    minHeight: 48,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalCancelButton: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  modalSaveButton: {
    backgroundColor: "#0077B6",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
});