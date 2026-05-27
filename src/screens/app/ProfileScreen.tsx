import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { COLORS } from "../../themes/colors";
import { FONTS } from "../../themes/fonts";
import { ICONS } from "../../themes/icons";
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
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import { useProfileViewModel } from "../../viewmodels/useProfileViewModel";
import { AppFooter } from "../../components/AppFooter";
import styles from "../../styles/profileScreen.style";

type Tab = "resumo" | "evolucao" | "ajustes";

function WeeklyGoalCard({ weeklyProgress }: { weeklyProgress: number }) {
    return (
        <View style={[styles.weeklyGoalCard, { marginTop: 12 }]}>
            <Text style={styles.weeklyTitle}>Meta Semanal</Text>
            <View style={styles.weeklyRow}>
                <Text style={styles.weeklyPercent}>{weeklyProgress}%</Text>
                <Text style={styles.weeklyLabel}>Concluído</Text>
            </View>
            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${weeklyProgress}%` as any }]}>
                    <View style={styles.runnerWrapper}>
                        <Text style={styles.runnerEmoji}>🏃🏼‍➡️</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export function ProfileScreen() {
    const navigation = useNavigation<any>();
    const { user, setUser } = useAuthContext() as {
        user: { id?: number; name?: string } | null;
        setUser: (userData: null) => Promise<void>;
    };

    const [activeTab, setActiveTab] = useState<Tab>("resumo");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const {
        profileData,
        profilePhotoSource,
        coordinatorPhotoSource,
        responsibleStudentPhotoSource,
        loading,
        uploadingPhoto,
        error,
        pickAndUploadProfilePhoto,
    } = useProfileViewModel();

    const weeklyProgress = profileData?.weeklyProgress?.percentCompleted ?? 67;

    const handleGoBack = () =>
        navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

    async function handleLogout() {
        await setUser(null);
    }

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleProfilePhotoPress() {
        const result = await pickAndUploadProfilePhoto();

        if (result?.message) {
            setModalMessage(result.message);
            setModalVisible(true);
        }
    }

    const painColors: Record<number, string> = {
        1: "#4CAF50",
        2: "#66BB6A",
        3: "#9CCC65",
        4: "#D4E157",
        5: "#FFEE58",
        6: "#FFA726",
        7: "#FF7043",
        8: "#EF5350",
        9: "#E53935",
        10: "#B71C1C",
    };

    const barData = [65, 80, 55, 90, 70, 85, 67];

    const ResumoTab = () => (
        <View style={styles.tabContent}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados Clínicos</Text>
                <View style={styles.divider} />
                <View style={styles.clinicalRow}>
                    <Text style={styles.clinicalLabel}>Início do Tratamento</Text>
                    <Text style={[styles.clinicalValue, { color: COLORS.primary }]}>
                        01/03/2020
                    </Text>
                </View>
                <View style={styles.clinicalRow}>
                    <Text style={styles.clinicalLabel}>Alergias</Text>
                    <Text style={styles.clinicalValue}>Dipirona</Text>
                </View>
            </View>

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.cardTitle}>Diagnósticos</Text>
                <View style={styles.divider} />
                <View style={styles.diagRow}>
                    <Text style={styles.diagText}>M75.1 – Manguito Rotador</Text>
                    <View style={[styles.badge, { backgroundColor: "#FF6B6B" }]}>
                        <Text style={styles.badgeText}>Em anda.</Text>
                    </View>
                </View>
                <View style={[styles.diagRow, { marginTop: 8 }]}>
                    <Text style={styles.diagText}>M54.2 – Cervicalgia</Text>
                    <View style={[styles.badge, { backgroundColor: "#4CAF50" }]}>
                        <Text style={styles.badgeText}>Resolvido</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.cardTitle}>Dor atual</Text>
                <View style={styles.divider} />
                <View style={styles.painRow}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <View
                            key={n}
                            style={[
                                styles.painCircle,
                                {
                                    backgroundColor: n === 3 ? painColors[3] : "#E8E8E8",
                                    borderColor: n === 3 ? painColors[3] : "transparent",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.painNumber,
                                    { color: n === 3 ? "#fff" : "#999" },
                                ]}
                            >
                                {n}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={styles.painLabels}>
                    <Text style={styles.painLabel}>Sem dor</Text>
                    <Text style={styles.painLabel}>Intensa</Text>
                </View>
            </View>

            <WeeklyGoalCard weeklyProgress={weeklyProgress} />

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.responsibleLabel}>Fisioterapeuta Responsável</Text>
                <View style={styles.responsibleRow}>
                    {responsibleStudentPhotoSource ? (
                        <Image source={responsibleStudentPhotoSource} style={styles.responsibleAvatarImage} />
                    ) : (
                        <View style={styles.avatarBox} />
                    )}
                    <View>
                        <Text style={styles.responsibleName}>
                            {profileData?.responsibleStudent?.name ?? "Dr. Sarah Chen"}
                        </Text>
                        <Text style={styles.responsibleSpecialty}>
                            Especialista Ortopédica
                        </Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.responsibleLabel}>Coordenador Responsável</Text>
                <View style={styles.responsibleRow}>
                    {coordinatorPhotoSource ? (
                        <Image source={coordinatorPhotoSource} style={styles.responsibleAvatarImage} />
                    ) : (
                        <View style={styles.avatarBox} />
                    )}
                    <View>
                        <Text style={styles.responsibleName}>
                            {profileData?.coordinator?.name ?? "Dr. Vanessa"}
                        </Text>
                        <Text style={styles.responsibleSpecialty}>
                            {profileData?.coordinator?.primarySpecialty ??
                                "Especialista Ortopédica"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const EvolucaoTab = () => (
        <View style={styles.tabContent}>
            <View style={styles.card}>
                <View style={styles.chartHeader}>
                    <Text style={styles.cardTitle}>Atividades concluídas</Text>
                    <Text style={styles.chartSubtitle}>Últimas 7 semanas</Text>
                </View>
                <View style={styles.barChart}>
                    {barData.map((val, i) => (
                        <View key={i} style={styles.barWrapper}>
                            <View style={styles.barTrack}>
                                <View
                                    style={[
                                        styles.barFill,
                                        { height: `${val}%` as any },
                                    ]}
                                />
                            </View>
                            <Text style={styles.barLabel}>S{i + 1}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.cardTitle}>Registros de evolução</Text>
                <View style={styles.divider} />
                <Text style={styles.evolutionDate}>22/04/2006 12:00</Text>
                <Text style={styles.evolutionText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                </Text>
                <Text style={styles.evolutionAuthor}>Dra. Sarah Chen</Text>
            </View>

            <WeeklyGoalCard weeklyProgress={weeklyProgress} />

            <View style={[styles.card, { marginTop: 12 }]}>
                <Text style={styles.cardTitle}>Áreas de atuação</Text>
                <View style={styles.divider} />
                <View style={styles.areaImageBox}>
                    <View style={styles.bodyFigure}>
                        <View style={styles.bodyHead} />
                        <View style={styles.bodyNeck} />
                        <View style={styles.bodyTorsoRow}>
                            <View style={styles.bodyArm} />
                            <View style={styles.bodyTorso} />
                            <View style={styles.bodyArm} />
                        </View>
                        <View style={styles.bodyHips} />
                        <View style={styles.bodyLegsRow}>
                            <View style={styles.bodyLeg} />
                            <View style={{ width: 10 }} />
                            <View style={styles.bodyLeg} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    const AjustesTab = () => (
        <View style={styles.tabContent}>
            {loading && (
                <Text style={{ color: COLORS.text.primary }}>
                    Carregando perfil...
                </Text>
            )}
            {error && (
                <Text style={{ color: COLORS.text.status.error }}>{error}</Text>
            )}
            <Text style={styles.sectionTitle}>Configurações e Suporte</Text>

            <View style={[styles.card, { marginTop: 12, padding: 0 }]}>
                {[
                    { icon: ICONS.alerts, label: "Lembretes" },
                    { icon: ICONS.notifications, label: "Notificações" },
                    { icon: ICONS.data_privacy, label: "Privacidade e Dados" },
                ].map((item, idx) => (
                    <TouchableOpacity key={idx} style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Image
                                source={item.icon}
                                style={{ width: 42, height: 42, resizeMode: "contain" }}
                            />
                            <Text style={styles.settingLabel}>{item.label}</Text>
                        </View>
                        <Image
                            source={ICONS.arrow_right}
                            style={{ width: 26, height: 26, resizeMode: "contain" }}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
                <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.headerContainer}>
                            <View style={styles.headerTop}>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={handleGoBack}
                                >
                                    <Image
                                        source={ICONS.light_back}
                                        style={{ width: 24, height: 24, resizeMode: "contain" }}
                                    />
                                    <Text style={styles.backText}>Voltar</Text>
                                </TouchableOpacity>
                                <Text style={styles.appTitle}>Unifae CARE</Text>
                            </View>

                            <View style={styles.avatarSection}>
                                <TouchableOpacity
                                    onPress={handleProfilePhotoPress}
                                    disabled={uploadingPhoto}
                                    style={styles.profilePhotoButton}
                                >
                                    <Image
                                        source={profilePhotoSource ?? ICONS.user_image}
                                        style={profilePhotoSource ? styles.profilePhoto : styles.profileIcon}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.changePhotoText}>
                                    {uploadingPhoto ? "Enviando foto..." : "Toque para alterar a foto"}
                                </Text>
                                <Text style={styles.profileName}>
                                    {profileData?.profile.name ?? user?.name ?? "Cristiane Imamura"}
                                </Text>
                                <Text style={styles.profileId}>
                                    ID: {profileData?.profile.id ?? user?.id ?? "#000-REHAB"}
                                </Text>
                            </View>

                            <View style={styles.tabBar}>
                                {(["resumo", "evolucao", "ajustes"] as Tab[]).map((tab) => (
                                    <TouchableOpacity
                                        key={tab}
                                        style={styles.tabItem}
                                        onPress={() => setActiveTab(tab)}
                                    >
                                        <Text
                                            style={[
                                                styles.tabLabel,
                                                activeTab === tab && styles.tabLabelActive,
                                            ]}
                                        >
                                            {tab === "resumo"
                                                ? "Resumo"
                                                : tab === "evolucao"
                                                    ? "Evolução"
                                                    : "Ajustes"}
                                        </Text>
                                        {activeTab === tab && (
                                            <View style={styles.tabIndicator} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {activeTab === "resumo" && <ResumoTab />}
                        {activeTab === "evolucao" && <EvolucaoTab />}
                        {activeTab === "ajustes" && <AjustesTab />}

                        <Modal
                            visible={modalVisible}
                            animationType="slide"
                            transparent={true}
                        >
                            <View style={styles.backgroundModal}>
                                <View style={styles.modal}>
                                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                                    <TouchableOpacity
                                        onPress={handleCloseModal}
                                        style={styles.modalButton}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.text.primary,
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Ok
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <AppFooter currentRoute="Profile" />
        </SafeAreaView>
    );
}
