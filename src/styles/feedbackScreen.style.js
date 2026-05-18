import { StyleSheet } from "react-native";
import {COLORS} from "../themes/colors";
import {FONTS} from "../themes/fonts";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taxonomy: {
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: 25,
    alignItems: "center"
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 15,
    borderRadius: 15,
    backgroundColor: COLORS.light,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 20
  },
  feedbackLevel: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    shadowOpacity: 0.40,
    shadowRadius: 15,
    borderRadius: 15,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  checkedFeedbackLevel: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  observations: {
    marginTop: 55,
    padding: 15,
    shadowColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    shadowOpacity: 0.40,
    shadowRadius: 15,
    borderRadius: 15,
    backgroundColor: "#99CFB130",
  },
  endSession: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 7,
    width: "90%",
    alignItems: "center"
  },
  footer: {
    marginTop: 70,
    backgroundColor: "#34906494",
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  headerLogo: {
    alignItems: "center",
    marginTop: 20
  },
  saveButton: {
    width: "70%",
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 15,
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center"
  }
});

export default styles;
