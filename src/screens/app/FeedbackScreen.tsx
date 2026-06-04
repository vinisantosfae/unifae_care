import {useNavigation, useRoute} from "@react-navigation/native";
import {COLORS} from "../../themes/colors";
import {FONTS} from "../../themes/fonts";
import {ICONS} from "../../themes/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from "react-native";
import styles from "../../styles/feedbackScreen.style";
import {useFeedbackViewModel} from "../../viewmodels/useFeedbackViewModel";

export function FeedbackScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const {
      observations,
      setObservations,
      feedbackLevel,
      setFeedbackLevel,
      loading,
      error,
      success,
      saveFeedback,
    } = useFeedbackViewModel(route.params?.executionId);
    const handleGoBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

    const feedbackLevels = [
      {
        level: 0,
        title: "Sem Dor / Esforço",
        description: "Absolutamente incrível",
        image: require("../../assets/images/feedback_0.png")
      },
      {
        level: 2,
        title: "Leve",
        description: "Atividade tranquila e sustentável",
        image: require("../../assets/images/feedback_2.png")
      },
      {
        level: 5,
        title: "Moderado",
        description: "Senti o esforço, mas sem dor",
        image: require("../../assets/images/feedback_5.png")
      },
      {
        level: 8,
        title: "Intenso",
        description: "Exigiu bastante concentração",
        image: require("../../assets/images/feedback_8.png")
      },
      {
        level: 10,
        title: "Exaustão",
        description: "Limite físico atingido",
        image: require("../../assets/images/feedback_10.png")
      },
    ]

    async function handleSaveFeedback() {
      const saved = await saveFeedback();

      if (saved) {
        navigation.navigate("Home" as never, { refreshAt: Date.now() } as never);
      }
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
                <ImageBackground source={require('../../assets/images/header_feedback.png')} style={{width: "100%"}}>
                  <View style={styles.header}>
                    <View style={styles.headerTop}>
                      <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 5}} onPress={handleGoBack}>
                        <Image source={ICONS.light_back} style={{aspectRatio: 1, resizeMode: "contain", width: 27, height: 27}}/>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Voltar</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingHorizontal: 10, gap: 10, borderBottomWidth: 1, borderColor: COLORS.primary}}>
                <Image source={require('../../assets/images/feedback_image.png')} style={{aspectRatio: 1, resizeMode: "contain", height: 180, width: 160}}/>
                <View style={{alignItems: 'center', flex: 1}}>
                  <View style={styles.endSession}>
                    <Text style={{fontFamily: FONTS.main_semiBold, textTransform: "uppercase", fontSize: 10, color: COLORS.text.light}}>Sessão finalizada</Text>
                  </View>
                  <Text style={{fontSize: 22, fontFamily: FONTS.main_bold, textAlign: "center", marginTop: 7}}>Como você se sente?</Text>
                  <Text style={{marginTop: 5, textAlign: "center", fontSize: 12, fontFamily: FONTS.main_regular}}>Avalie seu nível de dor e esforço após o exercício para que possamos ajustar seu plano.</Text>
                </View>
              </View>
              <View style={styles.body}>
                {
                  feedbackLevels.map(level => (
                    <View key={level.level}>
                      <TouchableOpacity style={level.level == feedbackLevel ? styles.checkedFeedbackLevel : styles.feedbackLevel} onPress={() => setFeedbackLevel(level.level)}>
                        <Image source={level.image} style={{aspectRatio: 1, resizeMode: "contain", height: 70, width: 65}}/>
                        <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                          <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 22}}>{level.title}</Text>
                          <Text style={{color: "#455A64", fontFamily: FONTS.main_regular, marginTop: 5}}>{level.description}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
                <View style={styles.observations}>
                  {error && <Text style={{color: COLORS.text.status.error, marginBottom: 10}}>{error}</Text>}
                  {success && <Text style={{color: COLORS.primary, marginBottom: 10}}>{success}</Text>}
                  <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 24}}>Observações adicionais</Text>
                  <View style={{backgroundColor: COLORS.light, borderRadius: 15, borderWidth: 1, borderColor: COLORS.primary, padding: 15, marginTop: 10}}>
                    <TextInput
                      multiline={true}
                      numberOfLines={10}
                      style={{height: 200, fontSize: 15}}
                      onChangeText={setObservations}
                      value={observations}
                      placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje..."
                    />
                  </View>
                </View>
              </View>
              <View>
                <ImageBackground source={require('../../assets/images/footer_exercise.png')} style={{width: "100%"}}>
                  <View style={styles.headerLogo}>
                    <Image source={require('../../assets/images/unifae_logo.png')} style={{width: 130, height: 40, marginTop: 20}}/>
                    <Image source={require('../../assets/images/app_logo.png')} style={{width: 215, height: 215}}/>
                    <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                  </View>
                  <Text style={{color: COLORS.text.light, textAlign: "center", marginTop: 25, fontSize: 16}}>Seu progresso é nossa prioridade</Text>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveFeedback} disabled={loading}>
                      <Text style={{fontFamily: FONTS.main_semiBold, textTransform: "uppercase", fontSize: 18, color: COLORS.text.primary}}>{loading ? "Salvando..." : "Salvar feedback"}</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}
