import { StyleSheet } from "react-native";
import {COLORS} from "../themes/colors";
import {FONTS} from "../themes/fonts";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  body: {
    flex: 1,
    marginTop: 25
  },
  responsibles: {
    paddingHorizontal: 20,
    width: "100%"
  },
  responsible: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: "100%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#D7EADE36"
  },
  responsiblesInfo: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  weeklyGoal: {
    marginTop: 60,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center"
  },
  bar: {
    marginTop: 25,
    width: "100%",
    height: 10,
    backgroundColor: "#D7EADEAB",
    borderRadius: 10
  },
  progressBar: {
    width: "67%",
    height: 10,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  configAndSupport: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  configs: {
    marginTop: 23,
    gap: 10
  },
  config: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: "100%",
    padding: 13,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  signOut: {
    width: "70%",
    borderWidth: 1,
    borderColor: COLORS.text.status.error,
    backgroundColor: "#FF70704A",
    borderRadius: 30,
    padding: 15,
    marginTop: 35,
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
  footerItem: {
    alignItems: "center",
    gap: 2,
    flex: 1,
    borderRadius: 25,
    padding: 5
  },
  footerItemChecked: {
    alignItems: "center",
    gap: 2,
    flex: 1,
    backgroundColor: COLORS.footer.primary,
    borderRadius: 25,
    padding: 5
  },
  modal: {
    width: '70%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center'
  },
  modalButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center'
  }
});

export default styles;
