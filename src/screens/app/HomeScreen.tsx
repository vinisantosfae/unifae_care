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
import styles from "../../styles/homeScreen.style";

export function HomeScreen() {
    const navigation = useNavigation();
    const { user, setUser } = useAuthContext() as {
      user: { id?: number; nome?: string } | null;
      setUser: (userData: null) => Promise<void>;
    };
    const [progress, setProgress] = useState(78)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    async function handleLogout() {
        await setUser(null);
    }

    function handleCloseModal() {
        setModalVisible(false);
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
                <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                <View style={{alignItems: "flex-end"}}>
                  <TouchableOpacity style={{padding: 7, backgroundColor: COLORS.input.background, borderRadius: "100%", width: 37}} onPress={() => navigation.navigate("Alerts" as never)}>
                    <Image source={ICONS.alerts_light} style={{aspectRatio: 1, resizeMode: "contain", width: 23, height: 23}}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.body}>
                <ImageBackground source={require('../../assets/images/header_home.png')} style={{width: "100%", aspectRatio: 0.95}} resizeMode="contain">
                  <View style={{marginHorizontal: 20}}>
                    <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                      <View style={{width: "40%"}}>
                        <Text style={{fontSize: 22, color: COLORS.text.light, fontFamily: FONTS.main_bold}}>Olá, {user?.nome}!</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: COLORS.text.light, fontFamily: FONTS.main_regular}}>Seu cuidado diário faz toda a diferença na sua recuperação</Text>
                      </View>
                      <Image source={require('../../assets/images/phisioterapy.png')} style={{aspectRatio: 1, resizeMode: "contain", width: "50%", height: 180}}/>
                    </View>
                  </View>
                  <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                      <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 17}}>Seu plano de hoje</Text>
                      <Text style={{color: COLORS.text.primary}}>1 exercício</Text>
                    </View>
                    <View style={[styles.containerInternal, {justifyContent: "space-between", alignItems: "center", flexDirection: "row"}]}>
                      <View>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Mobilidade de Ombro</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 7}}>Pós-cirúrgico</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 2}}>Câncer de Mama</Text>
                        <View style={{alignItems: 'center', flexDirection: "row", marginTop: 15, gap: 5}}>
                          <Image source={ICONS.time} style={{aspectRatio: 1, resizeMode: "contain", width: 35, height: 35}}/>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>12 min</Text>
                        </View>
                      </View>
                      <Image source={require('../../assets/images/training_home.png')}/>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity style={styles.button}>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold, fontSize: 15}}>Iniciar Exercício</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <View style={styles.container}>
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Seu progresso</Text>
                  <View style={{flexDirection: "row", gap: 10, marginTop: 15, alignItems: "center"}}>
                    <View style={{justifyContent: "center", alignItems: 'center', borderRadius: "100%", borderWidth: 9, borderColor: "#E0E0E0", padding: 15, aspectRatio: 1}}>
                      <Text style={{fontFamily: FONTS.main_bold, fontSize: 24}}>{progress}%</Text>
                    </View>
                    {
                      progress <= 20 ? (
                        <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                          <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Você precisa se exercitar!</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular}}>Comece agora</Text>
                        </View>
                      ) : progress < 80 ? (
                        <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                          <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Você está indo muito bem!</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular}}>Continue assim</Text>
                        </View>
                      ) : (
                        <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                          <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Parabens pelo resultado da semana!</Text>
                        </View>
                      )
                    }
                  </View>
                </View>
                <View style={styles.container}>
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Equipe Responsável</Text>
                  <View style={styles.containerInternal}>
                    <View style={styles.responsiblesInfo}>
                      <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      <View>
                        <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Fisioterapeuta Responsável</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Sarah Chen</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>Especialista Ortopédica</Text>
                      </View>
                    </View>
                    <View style={{backgroundColor: COLORS.primary, height: 1}}></View>
                    <View style={styles.responsiblesInfo}>
                      <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      <View>
                        <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Coordenador Responsável</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Vanessa</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>Especialista Ortopédica</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItemChecked} onPress={() => navigation.navigate("Home")}>
                  <Image source={ICONS.home} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Schedule" as never)}>
                  <Image source={ICONS.schedule} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Exercises" as never)}>
                  <Image source={ICONS.exercises} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Exercícios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Progress" as never)}>
                  <Image source={ICONS.progress} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Progresso</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Profile")}>
                  <Image source={ICONS.profile} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Perfil</Text>
                </TouchableOpacity>
              </View>
              <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.backgroundModal}>
                    <View style={styles.modal}>
                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                    <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
                        <Text style={{color: COLORS.text.primary, fontWeight: "bold", textTransform: "uppercase"}}>Ok</Text>
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
