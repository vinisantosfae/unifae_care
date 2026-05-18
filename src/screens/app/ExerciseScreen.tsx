import {useNavigation, useRoute} from "@react-navigation/native";
import {useState} from "react";
import {COLORS} from "../../themes/colors";
import {FONTS} from "../../themes/fonts";
import {ICONS} from "../../themes/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from 'react-native-svg';
import YoutubePlayer from 'react-native-youtube-iframe';
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
  TouchableOpacity
} from "react-native";
import styles from "../../styles/exerciseScreen.style";
import {useExerciseViewModel} from "../../viewmodels/useExerciseViewModel";

export function ExerciseScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const [progress, setProgress] = useState(0)
    const { exercise, loading, error, submitting, concludeExercise } = useExerciseViewModel(route.params?.prescriptionItemId);
    const handleGoBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

    const ProgressCircle = () => {
      const size = 100;
      const strokeWidth = 11;
      const radius = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;

      const offset = circumference - (progress / 100) * circumference;

      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
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

    async function handleConcludeExercise() {
      try {
        const completion = await concludeExercise();
        navigation.navigate("Feedback" as never, { executionId: completion.executionId } as never);
      } catch {
        // A tela continua no detalhe; o usuário pode tentar novamente.
      }
    }

    const getYoutubeId = () => {
      const regex =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/

      const match = exercise?.videoUrl.match(regex)

      return match ? match[1] : null
    }

    if (loading) {
      return <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Carregando exercício...</Text></SafeAreaView>;
    }

    if (error || !exercise) {
      return <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}><Text>{error ?? "Exercício não encontrado."}</Text></SafeAreaView>;
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
                <ImageBackground source={require('../../assets/images/header_home.png')} style={{width: "100%"}}>
                  <View style={styles.header}>
                    <View style={styles.headerTop}>
                      <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 5}} onPress={handleGoBack}>
                        <Image source={ICONS.light_back} style={{aspectRatio: 1, resizeMode: "contain", width: 27, height: 27}}/>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_semiBold}}>Voltar</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 22, color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>Unifae CARE</Text>
                    </View>
                  </View>
                  <View style={{marginHorizontal: 20, alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", paddingTop: 20}}>
                    <View style={{width: "60%"}}>
                      <Text style={{fontSize: 22, color: COLORS.text.light, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>{exercise.title}</Text>
                      <View style={[styles.taxonomy, {marginTop: 20}]}>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>{exercise.taxonomy.axis}</Text>
                      </View>
                      <View style={styles.taxonomy}>
                        <Text style={{color: COLORS.text.light, textTransform: "uppercase", fontFamily: FONTS.main_bold}}>{exercise.taxonomy.objective}</Text>
                      </View>
                    </View>
                    <Image source={require('../../assets/images/exercise_image.png')} style={{aspectRatio: 1, resizeMode: "contain", height: 250, marginTop: 20}}/>
                  </View>
                  <View style={[styles.container, {marginHorizontal: 20}]}>
                    <YoutubePlayer
                      height={180}
                      play={true}
                      videoId={getYoutubeId()}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.body}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <View style={[styles.container, styles.metrics]}>
                    <Text style={{textTransform: "uppercase", color: COLORS.text.primary, fontFamily: FONTS.main_regular}}>Séries</Text>
                    <View style={{marginTop: 10, flexDirection: "row", gap: 5, alignItems: "center"}}>
                      <Image source={ICONS.series} style={{aspectRatio: 1, resizeMode: "contain", width: 20, height: 20}}/>
                      <Text style={{fontSize: 24, fontFamily: FONTS.main_bold, color: COLORS.text.primary}}>{exercise.metrics.series}</Text>
                    </View>
                    <Text style={{fontSize: 12, fontFamily: FONTS.main_regular, color: COLORS.text.primary, marginTop: 8}}>unidades</Text>
                  </View>
                  <View style={[styles.container, styles.metrics]}>
                    <Text style={{textTransform: "uppercase", color: COLORS.text.primary, fontFamily: FONTS.main_regular}}>Repetições</Text>
                    <View style={{marginTop: 10, flexDirection: "row", gap: 5, alignItems: "center"}}>
                      <Image source={ICONS.repetitions} style={{aspectRatio: 1, resizeMode: "contain", width: 20, height: 20}}/>
                      <Text style={{fontSize: 24, fontFamily: FONTS.main_bold, color: COLORS.text.primary}}>{exercise.metrics.repetitionsRaw}</Text>
                    </View>
                    <Text style={{fontSize: 12, fontFamily: FONTS.main_regular, color: COLORS.text.primary, marginTop: 8}}>por série</Text>
                  </View>
                  <View style={[styles.container, styles.metrics]}>
                    <Text style={{textTransform: "uppercase", color: COLORS.text.primary, fontFamily: FONTS.main_regular, textAlign: "center"}}>Meta Semanal</Text>
                    <View style={{marginTop: 10, flexDirection: "row", gap: 5, alignItems: "center"}}>
                      <Image source={ICONS.weekly_goal} style={{aspectRatio: 1, resizeMode: "contain", width: 20, height: 20}}/>
                      <Text style={{fontSize: 24, fontFamily: FONTS.main_bold, color: COLORS.text.primary}}>{progress}%</Text>
                    </View>
                    <Text style={{fontSize: 12, fontFamily: FONTS.main_regular, color: COLORS.text.primary, marginTop: 8}}>concluído</Text>
                  </View>
                </View>
                <View style={[styles.container, {marginTop: 25, flexDirection: "row", alignItems: "center"}]}>
                  <ProgressCircle />
                  {
                    progress <= 20 ? (
                      <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                        <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Você precisa se exercitar!</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 10}}>Comece agora</Text>
                      </View>
                    ) : progress < 80 ? (
                      <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                        <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Você está indo muito bem!</Text>
                        <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 10}}>Continue assim</Text>
                      </View>
                    ) : (
                      <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
                        <Text style={{color: COLORS.text.primary, textAlign: "center", fontFamily: FONTS.main_semiBold, fontSize: 15}}>Parabens pelo resultado da semana!</Text>
                      </View>
                    )
                  }
                </View>
                <View style={{marginTop: 40}}>
                  <Text style={{fontSize: 24, color: COLORS.text.primary, fontFamily: FONTS.main_bold, textTransform: "uppercase"}}>Passo a passo</Text>
                  <View style={{marginTop: 20}}>
                    <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_regular}}>
                      {exercise.instructions || "Nenhuma instrução disponível para este exercício."}
                    </Text>
                  </View>
                </View>
                <View style={styles.tip}>
                  <View style={{borderColor: COLORS.primary, borderWidth: 1, borderRadius: 15, width: 60, height: 60, justifyContent: "center", alignItems: "center"}}>
                      <Image source={ICONS.user_image} style={{aspectRatio: 1, resizeMode: "contain", width: 35, height: 35}}/>
                  </View>
                  <View>
                    <Text>Dica do fisioterapeuta</Text>
                    <Text>{exercise.physiotherapistNotes || "Nenhuma observação adicional cadastrada."}</Text>
                  </View>
                </View>
              </View>
              <View>
                <ImageBackground source={require('../../assets/images/footer_exercise.png')} style={{width: "100%"}}>
                  <View style={styles.team}>
                    <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Equipe Responsável</Text>
                    <View style={styles.teamInternal}>
                      <View style={styles.teamInfo}>
                        <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                        <View>
                          <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Fisioterapeuta Responsável</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Sarah Chen</Text>
                          <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>Especialista Ortopédica</Text>
                        </View>
                      </View>
                      <View style={{backgroundColor: COLORS.primary, height: 1}}></View>
                      <View style={styles.teamInfo}>
                        <View style={{backgroundColor: COLORS.primary, width: 60, height: 60, borderRadius: 15}}></View>
                        <View>
                          <Text style={{textTransform: "uppercase", color: "#349064BD", fontFamily: FONTS.main_semiBold}}>Coordenador Responsável</Text>
                          <Text style={{color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16}}>Dr. Vanessa</Text>
                          <Text style={{color: "#349064BD", fontFamily: FONTS.main_regular, marginTop: 5}}>Especialista Ortopédica</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.concludeButton} onPress={handleConcludeExercise} disabled={submitting}>
                      <Text style={{fontFamily: FONTS.main_semiBold, textTransform: "uppercase", fontSize: 18, color: COLORS.text.primary}}>{submitting ? "Concluindo..." : "Concluir atividade"}</Text>
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
