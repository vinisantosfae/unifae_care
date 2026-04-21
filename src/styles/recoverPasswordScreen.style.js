import { StyleSheet } from "react-native";
import {COLORS} from "../themes/colors";
import {FONTS} from "../themes/fonts";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20
  },
  headerLogo: {
    alignItems: "center",
    marginTop: 10
  },
  body: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
    paddingHorizontal: 20
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
  label: {
    marginTop: 15,
    width: "100%",
    fontFamily: FONTS.main_regular,
    fontSize: 15
  },
  viewInput: {
    flexDirection: "row",
    gap: 6,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 3,
    height: 50,
    backgroundColor: COLORS.input.background,
    alignItems: "center",
    width: "100%"
  },
  iconInput: {
    aspectRatio: 1,
    resizeMode: "contain",
    width: 30,
    height: 40,
  },
  input: {
    color: COLORS.text.primary,
    flex: 1,
    fontFamily: FONTS.main_regular,
    fontSize: 15
  },
  formButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    width: "70%",
    borderRadius: 30,
    height: 45,
    justifyContent: "center"
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
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
