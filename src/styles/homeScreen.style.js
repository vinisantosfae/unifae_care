import { StyleSheet } from "react-native";
import {COLORS} from "../themes/colors";
import {FONTS} from "../themes/fonts";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    marginTop: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 15,
    borderRadius: 15,
    backgroundColor: COLORS.light
  },
  containerInternal: {
    marginTop: 15,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.4,
    width: "100%",
    padding: 15,
    borderRadius: 15,
    shadowRadius: 15,
    backgroundColor: "#D7EADE36",
    gap: 15
  },
  responsiblesInfo: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  button: {
    width: "80%",
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 8,
    marginTop: 15,
    alignItems: "center"
  },
  footer: {
    marginTop: 60,
    backgroundColor: COLORS.primary,
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
    backgroundColor: "#99CFB130",
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
