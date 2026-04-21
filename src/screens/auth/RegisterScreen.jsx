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
import styles from "../../styles/registerScreen.style";

export function RegisterScreen() {
    const navigation = useNavigation();

    const [userType, setUserType] = useState("patient");
    const [name, setName] = useState("");
    const [ra, setRa] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Image source={ICONS.back} style={{aspectRatio: 1, resizeMode: "contain", width: 27, height: 27}}/>
                    <Text style={{color: "#349064", textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Voltar</Text>
                </TouchableOpacity>
                <View style={styles.headerLogo}>
                    <Image source={require('../../assets/images/unifae_logo.png')} style={{width: 120, height: 50}}/>
                    <Image source={require('../../assets/images/app_logo.png')} style={{width: 180, height: 180}}/>
                    <Text style={{fontSize: 22, color: "#349064", textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                </View>
                </View>
                <View style={styles.body}>
                <Text style={{textTransform: "uppercase", fontSize: 18, fontFamily: FONTS.main_semiBold}}>Cadastro</Text>
                <Text style={{fontFamily: FONTS.main_regular, fontSize: 15}}>Informe seus dados para continuar</Text>
                <Text style={{marginTop: 40, fontFamily: FONTS.main_regular, fontSize: 16}}>Tipo de usuário</Text>
                <View style={{flexDirection: "row", gap: 30, marginTop: 10}}>
                    <TouchableOpacity
                    key={"physiotherapist"}
                    onPress={() => setUserType("physiotherapist")}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                    >
                    <View
                        style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#349064',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                        }}
                    >
                        {userType === "physiotherapist" && (
                        <View
                            style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: '#349064',
                            }}
                        />
                        )}
                    </View>
                    <Text style={{color: "#349064", fontFamily: FONTS.main_regular, fontSize: 15}}>Fisioterapeuta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    key={"patient"}
                    onPress={() => setUserType("patient")}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                    >
                    <View
                        style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#349064',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                        }}
                    >
                        {userType === "patient" && (
                        <View
                            style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: '#349064',
                            }}
                        />
                        )}
                    </View>
                    <Text style={{color: "#349064", fontFamily: FONTS.main_regular, fontSize: 15}}>Paciente</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.viewInput}>
                    <Image source={ICONS.name_tag} style={styles.iconInput}/>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#349064"
                        placeholder="Seu nome"
                    />
                    </View>
                    {userType === 'physiotherapist' && (
                    <View>
                        <Text style={styles.label}>RA</Text>
                        <View style={styles.viewInput}>
                        <Image source={ICONS.square_numbers} style={styles.iconInput}/>
                        <TextInput
                            style={styles.input}
                            value={ra}
                            onChangeText={setRa}
                            placeholderTextColor="#349064"
                            placeholder="00000-0"
                        />
                        </View>
                    </View>
                    )}
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.viewInput}>
                    <Image source={ICONS.email} style={styles.iconInput}/>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail(email.toLowerCase())}
                        placeholderTextColor="#349064"
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
                        placeholderTextColor="#349064"
                        placeholder="********"
                        secureTextEntry={!showPassword}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={{fontSize: 12, fontFamily: FONTS.main_light}}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.formButton} onPress={() => handleRegister()}>
                    <Text style={{color: "white", fontSize: 16, textAlign: "center", textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
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
                        <Text style={{color: "#349064", fontWeight: "bold", textTransform: "uppercase"}}>Ok</Text>
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