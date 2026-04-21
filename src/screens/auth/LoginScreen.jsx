import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {COLORS} from "../../themes/colors";
import {FONTS} from "../../themes/fonts";
import {ICONS} from "../../themes/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from 'react-native-paper';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Modal
} from "react-native";
import styles from "../../styles/loginScreen.style";

export function LoginScreen() {
    const navigation = useNavigation();

    const [userType, setUserType] = useState("patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const recoverPassword = () => {
      navigation.navigate("RecoverPassword")
    }
    const register = () => {
      navigation.navigate("Register")
    }

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                  <View style={styles.headerLogo}>
                      <Image source={require('../../assets/images/unifae_logo.png')} style={{width: 120, height: 50}}/>
                      <Image source={require('../../assets/images/app_logo.png')} style={{width: 180, height: 180}}/>
                      <Text style={{fontSize: 22, color: COLORS.text.primary, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                  </View>
                </View>
                <View style={styles.body}>
                  <Text style={{fontSize: 18, fontFamily: FONTS.main_semiBold}}>Bem Vindo(a) ao UNIFAE Care</Text>
                  <Text style={{fontFamily: FONTS.main_regular, fontSize: 15}}>Entre com suas credenciais para continuar</Text>
                  <View style={styles.form}>
                      <Text style={styles.label}>Email</Text>
                      <View style={styles.viewInput}>
                        <Image source={ICONS.email} style={styles.iconInput}/>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={email => setEmail(email.toLowerCase())}
                            placeholderTextColor={COLORS.text.primary}
                            placeholder="nome@exemplo.com.br"
                        />
                      </View>
                      <Text style={styles.label}>Senha</Text>
                      <View style={styles.viewInput}>
                        <View style={{flexDirection: "row", gap: 5, flex: 1}}>
                            <Image source={ICONS.padlock} style={styles.iconInput}/>
                            <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={COLORS.primary}
                            placeholder="********"
                            secureTextEntry={!showPassword}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Text style={{fontSize: 12, fontFamily: FONTS.main_light}}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={{marginTop: 5}} onPress={() => recoverPassword()}>
                        <Text style={{textTransform: "uppercase", fontFamily: FONTS.main_semiBold, color: COLORS.primary}}>Recuperar senha</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.formButton}>
                        <Text style={{color: "white", fontSize: 16, textAlign: "center", textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Entrar</Text>
                      </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: FONTS.main_regular, fontSize: 16, marginTop: 25}}>Não possui uma conta?</Text>
                  <TouchableOpacity style={{marginTop: 10}} onPress={() => register()}>
                    <Text style={{textTransform: "uppercase", fontFamily: FONTS.main_semiBold, color: COLORS.primary, fontSize: 13}}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <ImageBackground source={require('../../assets/images/footer.png')} style={{width: "100%", aspectRatio: 1.56, justifyContent: "flex-end"}} resizeMode="contain">
                    <Text style={{color: "white", textAlign: "center", fontSize: 12, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>© 2026 - Unifae CARE</Text>
                    <View style={{flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 18, paddingBottom: 12, fontWeight: "bold"}}>
                    <TouchableOpacity><Text style={{color: "white", fontSize: 12, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Privacidade</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color: "white", fontSize: 12, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Termos</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color: "white", fontSize: 12, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Acessibilidade</Text></TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.backgroundModal}>
                    <View style={styles.modal}>
                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                        <Text style={{color: COLORS.primary, fontWeight: "bold", textTransform: "uppercase"}}>Ok</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
