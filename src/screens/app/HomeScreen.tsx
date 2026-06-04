import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {COLORS} from "../../themes/colors";
import {FONTS} from "../../themes/fonts";
import {ICONS} from "../../themes/icons";
import Svg, { Circle } from 'react-native-svg';
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
import {useHomeViewModel} from "../../viewmodels/useHomeViewModel";
import {AppFooter} from "../../components/AppFooter";

export function HomeScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { user, setUser } = useAuthContext() as {
      user: { id?: number; name?: string } | null;
      setUser: (userData: null) => Promise<void>;
    };
    const {
      home,
      motivation,
      profileData,
      coordinatorPhotoSource,
      responsibleStudentPhotoSource,
      loading,
      error,
      reload,
    } = useHomeViewModel();
    const progress = home?.plan.percentCompleted ?? 0;
    const nextExercise = home?.nextExercise;
    const showTodayPlan = !!nextExercise && progress < 100;
    const motivationMessage = motivation?.message ?? home?.motivation?.message;
    const responsibleStudent = profileData?.responsibleStudent;
    const coordinator = profileData?.coordinator;

    useFocusEffect(
      useCallback(() => {
        reload();
      }, [route.params?.refreshAt])
    );

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

    const ProgressCircle = () => {
      const size = 120; // pode ajustar se quiser
      const strokeWidth = 9; // igual ao seu borderWidth
      const radius = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;

      const offset = circumference - (progress / 100) * circumference;

      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            aspectRatio: 1,
          }}
        >
          <Svg width={size} height={size}>
            {/* Fundo */}
            <Circle
              stroke="#E0E0E0"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />

            {/* Progresso */}
            <Circle
              stroke="#2E7D32"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>

          {/* Texto no centro */}
          <View style={{ position: "absolute" }}>
            <Text style={{ fontFamily: FONTS.main_bold, fontSize: 24 }}>
              {progress}%
            </Text>
          </View>
        </View>
      );
    };

    return (
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}
                keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                <View style={{alignItems: "flex-end", marginTop: 10}}>
                  <TouchableOpacity style={{padding: 7, backgroundColor: COLORS.input.background, borderRadius: "100%", width: 37}} onPress={() => navigation.navigate("Home" as never)}>
                    <Image source={ICONS.alerts_light} style={{aspectRatio: 1, resizeMode: "contain", width: 23, height: 23}}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <ImageBackground source={require('../../assets/images/header_home.png')} style={{width: "100%"}}>
                  <View style={{marginHorizontal: 20, alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{width: "40%"}}>
                      <Text style={{fontSize: 22, color: COLORS.text.light, fontFamily: FONTS.main_bold}}>Olá, {user?.name}!</Text>
                      <Text style={{fontSize: 16, marginTop: 10, color: COLORS.text.light, fontFamily: FONTS.main_regular}}>Seu cuidado diário faz toda a diferença na sua recuperação</Text>
                    </View>
                    <Image source={require('../../assets/images/phisioterapy.png')} style={{aspectRatio: 1, resizeMode: "contain", width: "50%", height: 180}}/>
                  </View>
                  {showTodayPlan && (
                    <View style={styles.container}>
                      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 17}}>Seu plano de hoje</Text>
                        <Text style={{color: COLORS.text.primary}}>{home?.plan.totalExercises ?? 0} exercício(s)</Text>
                      </View>
                      <View style={[styles.containerInternal, {justifyContent: "space-between", alignItems: "center", flexDirection: "row"}]}>
                        <View>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>{nextExercise!.exerciseName}</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 7}}>{nextExercise!.axis}</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 2}}>{nextExercise!.problem}</Text>
                          <View style={{alignItems: 'center', flexDirection: "row", marginTop: 15, gap: 5}}>
                            <Image source={ICONS.time} style={{aspectRatio: 1, resizeMode: "contain", width: 35, height: 35}}/>
                            <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>12 min</Text>
                          </View>
                        </View>
                        <Image source={require('../../assets/images/training_home.png')}/>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => navigation.navigate("Exercise" as never, { prescriptionItemId: nextExercise!.prescriptionItemId } as never)}
                        >
                          <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold, fontSize: 15}}>Iniciar Exercício</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </ImageBackground>
                <View style={styles.container}>
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Seu progresso</Text>
                  {loading && <Text style={{color: COLORS.text.primary, marginTop: 10}}>Carregando...</Text>}
                  {error && <Text style={{color: COLORS.text.status.error, marginTop: 10}}>{error}</Text>}
                  <View style={{flexDirection: "row", gap: 2, marginTop: 15, alignItems: "center"}}>
                    <ProgressCircle />
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
                  {motivationMessage && (
                    <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 12}}>
                      {motivationMessage}
                    </Text>
                  )}
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 12}}>
                    Dor hoje: {home?.painToday.recorded ? home.painToday.level ?? "Registrada" : "Ainda não registrada"}
                  </Text>
                </View>
                <View style={styles.container}>
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Equipe Responsável</Text>
                  <View style={styles.containerInternal}>
                    <View style={styles.responsiblesInfo}>
                      {responsibleStudentPhotoSource ? (
                        <Image source={responsibleStudentPhotoSource} style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15, resizeMode: "cover"}}/>
                      ) : (
                        <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      )}
                      <View>
                        <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Fisioterapeuta Responsável</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>{responsibleStudent?.name ?? "Responsável não informado"}</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>{responsibleStudent?.email ?? "Aluno responsável"}</Text>
                      </View>
                    </View>
                    <View style={{backgroundColor: COLORS.primary, height: 1}}></View>
                    <View style={styles.responsiblesInfo}>
                      {coordinatorPhotoSource ? (
                        <Image source={coordinatorPhotoSource} style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15, resizeMode: "cover"}}/>
                      ) : (
                        <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                      )}
                      <View>
                        <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Coordenador Responsável</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>{coordinator?.name ?? "Coordenador não informado"}</Text>
                        <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>{coordinator?.primarySpecialty ?? "Especialidade não informada"}</Text>
                      </View>
                    </View>
                  </View>
                </View>
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
        <AppFooter currentRoute="Home" />
      </SafeAreaView>
    );
}
