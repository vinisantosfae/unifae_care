import { StyleSheet } from "react-native";
import {COLORS} from "../themes/colors";
import {FONTS} from "../themes/fonts";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: COLORS.light,
    borderBottomWidth: 1
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
  metrics: {
    backgroundColor: '#EEF3EF',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: "31%"
  },
  tip: {
    marginTop: 70,
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: '#EEF3EF',
    flexDirection: "row",
    gap: 30,
  },
  team: {
    marginHorizontal: 20,
    marginTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 15,
    borderRadius: 15,
    backgroundColor: COLORS.light
  },
  teamInternal: {
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
  teamInfo: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  concludeButton: {
    width: "70%",
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 15,
    marginTop: 90,
    marginBottom: 50,
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
  }
});

export default styles;
