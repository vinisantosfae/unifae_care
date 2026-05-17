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
import styles from "../../styles/profileScreen.style";

export function ProfileScreen() {
    const navigation = useNavigation();
    const { user, setUser } = useAuthContext() as {
      user: { id?: number; nome?: string } | null;
      setUser: (userData: null) => Promise<void>;
    };

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
              <View>
                <ImageBackground source={require('../../assets/images/header_profile.png')} style={{width: "100%", aspectRatio: 0.88}} resizeMode="contain">
                  <View style={styles.header}>
                    <View style={styles.headerTop}>
                      <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 5}} onPress={() => navigation.navigate("Home" as never)}>
                        <Image source={ICONS.light_back} style={{aspectRatio: 1, resizeMode: "contain", width: 27, height: 27}}/>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Voltar</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                    </View>
                    <View style={{alignItems: "center", marginTop: 25}}>
                      <Image source={ICONS.user_image} style={{aspectRatio: 1, resizeMode: "contain", width: 150, height: 150}}/>
                      <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>{user?.nome}</Text>
                      <Text style={{fontSize: 15, color: COLORS.text.light, fontFamily: FONTS.main_light}}>ID: {user?.id}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.body}>
                <View style={styles.responsibles}>
                  <View style={styles.responsible}>
                    <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold, letterSpacing: 1.5}}>Fisioterapeuta Responsável</Text>
                    <View style={styles.responsiblesInfo}>
                      <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      <View>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Sarah Chen</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 3}}>Especialista Ortopédica</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.responsible, {marginTop: 40}]}>
                    <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold, letterSpacing: 1.5}}>Coordenador Responsável</Text>
                    <View style={styles.responsiblesInfo}>
                      <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      <View>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Vanessa</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 3}}>Especialista Ortopédica</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.weeklyGoal}>
                  <Text style={{textTransform: "uppercase", fontFamily: FONTS.main_bold, color: COLORS.text.light, fontSize: 16}}>Meta Semanal</Text>
                  <View style={{flexDirection: "row", gap: 5, alignItems: "flex-end", marginTop: 13}}>
                    <Text style={{fontSize: 32, fontFamily: FONTS.main_bold, color: COLORS.text.light}}>67%</Text>
                    <Text style={{fontFamily: FONTS.main_regular, color: COLORS.text.light, marginBottom: 5, fontSize: 16 }}>Concluído</Text>
                  </View>
                  <View style={styles.bar}>
                    <View style={styles.progressBar}>
                      <Image source={ICONS.weekly_goal_progress} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                    </View>
                  </View>
                </View>
                <View style={styles.configAndSupport}>
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_bold, fontSize: 18, textTransform: "uppercase"}}>Configurações e Suporte</Text>
                  <View style={styles.configs}>
                    <View style={styles.config}>
                      <View style={{flexDirection: "row", gap: 15, alignItems: "center"}}>
                        <Image source={ICONS.alerts} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, fontSize: 18}}>Lembretes</Text>
                      </View>
                      <Image source={ICONS.arrow_right} style={{aspectRatio: 1, resizeMode: "contain", width: 30, height: 30}}/>
                    </View>
                    <View style={styles.config}>
                      <View style={{flexDirection: "row", gap: 15, alignItems: "center"}}>
                        <Image source={ICONS.notifications} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, fontSize: 18}}>Notificações</Text>
                      </View>
                      <Image source={ICONS.arrow_right} style={{aspectRatio: 1, resizeMode: "contain", width: 30, height: 30}}/>
                    </View>
                    <View style={styles.config}>
                      <View style={{flexDirection: "row", gap: 15, alignItems: "center"}}>
                        <Image source={ICONS.data_privacy} style={{aspectRatio: 1, resizeMode: "contain", width: 50, height: 50}}/>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, fontSize: 18}}>Privacidade e Dados</Text>
                      </View>
                      <Image source={ICONS.arrow_right} style={{aspectRatio: 1, resizeMode: "contain", width: 30, height: 30}}/>
                    </View>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity style={styles.signOut} onPress={handleLogout}>
                    <Text style={{fontFamily: FONTS.main_semiBold, textTransform: "uppercase", fontSize: 18, color: COLORS.text.status.error}}>Sair</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
                  <Image source={ICONS.home} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Schedule" as never)}>
                  <Image source={ICONS.schedule} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Progress" as never)}>
                  <Image source={ICONS.progress} style={{aspectRatio: 1, resizeMode: "contain", width: 45, height: 45}}/>
                  <Text style={{color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Progresso</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItemChecked} onPress={() => navigation.navigate("Profile")}>
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
