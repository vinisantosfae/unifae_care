import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
    StyleSheet,
} from "react-native";
import { AppFooter } from "../../components/AppFooter";
import styles from "../../styles/scheduleScreen.style";

function SectionHeader({ title }: { title: string }) {
    return (
        <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );
}

const PRIMARY = "#2E8B62";

const DAYS_OF_WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const today = new Date();

const SESSIONS = [
    {
        id: 1,
        date: "Hoje",
        time: "09:00",
        duration: "50 min",
        type: "Fisioterapia",
        professional: "Dra. Sarah Chen",
        status: "confirmado",
        location: "Sala 3 – Clínica UniFAE",
    },
    {
        id: 2,
        date: "Amanhã",
        time: "14:30",
        duration: "50 min",
        type: "Avaliação Postural",
        professional: "Dra. Sarah Chen",
        status: "pendente",
        location: "Sala 1 – Clínica UniFAE",
    },
    {
        id: 3,
        date: "Sex, 29 Jun",
        time: "10:00",
        duration: "50 min",
        type: "Fisioterapia",
        professional: "Dra. Sarah Chen",
        status: "confirmado",
        location: "Sala 3 – Clínica UniFAE",
    },
];

const EXERCISES = [
    { id: 1, name: "Alongamento Cervical", sets: "3x", reps: "30s", done: true },
    { id: 2, name: "Fortalecimento Manguito", sets: "3x", reps: "12 rep", done: true },
    { id: 3, name: "Mobilização Escapular", sets: "2x", reps: "15 rep", done: false },
    { id: 4, name: "Exercício Pendular", sets: "3x", reps: "10 rep", done: false },
];

const HISTORY = [
    {
        id: 1,
        date: "15 Jun 2025",
        time: "09:00",
        type: "Fisioterapia",
        professional: "Dra. Sarah Chen",
        note: "Boa evolução na amplitude de movimento.",
    },
    {
        id: 2,
        date: "08 Jun 2025",
        time: "14:30",
        type: "Avaliação",
        professional: "Dr. Vanessa",
        note: "Redução significativa da dor relatada.",
    },
    {
        id: 3,
        date: "01 Jun 2025",
        time: "09:00",
        type: "Fisioterapia",
        professional: "Dra. Sarah Chen",
        note: "Iniciou protocolo de fortalecimento.",
    },
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export function ScheduleScreen() {
    const navigation = useNavigation<any>();

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const handleGoBack = () =>
        navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const markedDays = new Set([today.getDate(), today.getDate() + 1, today.getDate() + 4]);

    const exercisesDone = EXERCISES.filter(e => e.done).length;
    const exercisesTotal = EXERCISES.length;

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#F5F7F5" }}>
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
                                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                                    <Image source={ICONS.light_back} style={{ width: 24, height: 24, resizeMode: "contain" }} />
                                    <Text style={styles.backText}>Voltar</Text>
                                </TouchableOpacity>
                                <Text style={styles.appTitle}>Unifae CARE</Text>
                            </View>

                            <View style={styles.headerBody}>
                                <Text style={styles.headerTitle}>Minha Agenda</Text>
                                <Text style={styles.headerSubtitle}>
                                    {today.getDate()} de {MONTHS[today.getMonth()]} de {today.getFullYear()}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.content}>
                            <View style={styles.card}>
                                <View style={styles.calendarHeader}>
                                    <TouchableOpacity onPress={prevMonth} style={styles.monthNavBtn}>
                                        <Text style={styles.monthNavArrow}>‹</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.monthTitle}>
                                        {MONTHS[currentMonth]} {currentYear}
                                    </Text>
                                    <TouchableOpacity onPress={nextMonth} style={styles.monthNavBtn}>
                                        <Text style={styles.monthNavArrow}>›</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.weekRow}>
                                    {DAYS_OF_WEEK.map((d, i) => (
                                        <Text key={i} style={styles.weekLabel}>{d}</Text>
                                    ))}
                                </View>

                                <View style={styles.calendarGrid}>
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <View key={`empty-${i}`} style={styles.dayCell} />
                                    ))}
                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                        const isToday =
                                            day === today.getDate() &&
                                            currentMonth === today.getMonth() &&
                                            currentYear === today.getFullYear();
                                        const isSelected = day === selectedDay && currentMonth === today.getMonth();
                                        const hasSession = markedDays.has(day);

                                        return (
                                            <TouchableOpacity
                                                key={day}
                                                style={styles.dayCell}
                                                onPress={() => setSelectedDay(day)}
                                            >
                                                <View style={[
                                                    styles.dayInner,
                                                    isSelected && styles.daySelected,
                                                    isToday && !isSelected && styles.dayToday,
                                                ]}>
                                                    <Text style={[
                                                        styles.dayText,
                                                        isSelected && styles.dayTextSelected,
                                                        isToday && !isSelected && styles.dayTextToday,
                                                    ]}>
                                                        {day}
                                                    </Text>
                                                </View>
                                                {hasSession && (
                                                    <View style={[styles.dot, isSelected && styles.dotSelected]} />
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            <SectionHeader title="Sessões Agendadas" />
                            {SESSIONS.map((session) => (
                                <View key={session.id} style={[styles.card, styles.sessionCard]}>
                                    <View style={[
                                        styles.sessionStripe,
                                        { backgroundColor: session.status === "confirmado" ? PRIMARY : "#FFA726" }
                                    ]} />
                                    <View style={styles.sessionBody}>
                                        <View style={styles.sessionTop}>
                                            <View>
                                                <Text style={styles.sessionDate}>{session.date}</Text>
                                                <Text style={styles.sessionType}>{session.type}</Text>
                                            </View>
                                            <View style={[
                                                styles.sessionBadge,
                                                { backgroundColor: session.status === "confirmado" ? "#E8F5EE" : "#FFF3E0" }
                                            ]}>
                                                <Text style={[
                                                    styles.sessionBadgeText,
                                                    { color: session.status === "confirmado" ? PRIMARY : "#E65100" }
                                                ]}>
                                                    {session.status === "confirmado" ? "Confirmado" : "Pendente"}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.sessionDetails}>
                                            <View style={styles.sessionDetailItem}>
                                                <Text style={styles.sessionDetailIcon}>🕐</Text>
                                                <Text style={styles.sessionDetailText}>{session.time} · {session.duration}</Text>
                                            </View>
                                            <View style={styles.sessionDetailItem}>
                                                <Text style={styles.sessionDetailIcon}>👩‍⚕️</Text>
                                                <Text style={styles.sessionDetailText}>{session.professional}</Text>
                                            </View>
                                            <View style={styles.sessionDetailItem}>
                                                <Text style={styles.sessionDetailIcon}>📍</Text>
                                                <Text style={styles.sessionDetailText}>{session.location}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                            <SectionHeader title="Exercícios de Hoje" />
                            <View style={styles.card}>
                                <View style={styles.exerciseProgressRow}>
                                    <Text style={styles.exerciseProgressLabel}>
                                        {exercisesDone}/{exercisesTotal} concluídos
                                    </Text>
                                    <Text style={styles.exerciseProgressPct}>
                                        {Math.round((exercisesDone / exercisesTotal) * 100)}%
                                    </Text>
                                </View>
                                <View style={styles.exerciseTrack}>
                                    <View style={[
                                        styles.exerciseFill,
                                        { width: `${(exercisesDone / exercisesTotal) * 100}%` as any }
                                    ]} />
                                </View>

                                <View style={{ marginTop: 14 }}>
                                    {EXERCISES.map((ex, idx) => (
                                        <View key={ex.id} style={[
                                            styles.exerciseRow,
                                            idx < EXERCISES.length - 1 && styles.exerciseRowBorder,
                                        ]}>
                                            <View style={[
                                                styles.exerciseCheck,
                                                ex.done && styles.exerciseCheckDone,
                                            ]}>
                                                {ex.done && <Text style={styles.checkMark}>✓</Text>}
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[
                                                    styles.exerciseName,
                                                    ex.done && styles.exerciseNameDone,
                                                ]}>
                                                    {ex.name}
                                                </Text>
                                                <Text style={styles.exerciseMeta}>{ex.sets} · {ex.reps}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <SectionHeader title="Histórico de Atendimentos" />
                            {HISTORY.map((item) => (
                                <View key={item.id} style={[styles.card, { marginBottom: 10 }]}>
                                    <View style={styles.historyTop}>
                                        <View style={styles.historyDateBadge}>
                                            <Text style={styles.historyDateText}>{item.date}</Text>
                                        </View>
                                        <Text style={styles.historyTime}>{item.time}</Text>
                                    </View>
                                    <Text style={styles.historyType}>{item.type}</Text>
                                    <Text style={styles.historyProfessional}>{item.professional}</Text>
                                    <View style={styles.historyDivider} />
                                    <Text style={styles.historyNote}>{item.note}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <AppFooter currentRoute="Schedule" />
        </SafeAreaView>
    );
}

