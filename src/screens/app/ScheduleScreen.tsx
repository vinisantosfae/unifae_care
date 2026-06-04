import { useNavigation } from "@react-navigation/native";
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
} from "react-native";
import { AppFooter } from "../../components/AppFooter";
import styles from "../../styles/scheduleScreen.style";
import { useScheduleViewModel } from "../../viewmodels/useScheduleViewModel";
import { PlanWeekAppointment, PlanWeekExercise } from "../../models/Api";

function SectionHeader({ title }: { title: string }) {
    return (
        <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );
}

const PRIMARY = "#2E8B62";
const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function formatDisplayDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

function formatShortDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
}

function getAppointmentTitle(appointment: PlanWeekAppointment) {
    return appointment.title ?? appointment.type ?? "Sessão agendada";
}

function getAppointmentTime(appointment: PlanWeekAppointment) {
    if (appointment.time) {
        return appointment.duration ? `${appointment.time} · ${appointment.duration}` : appointment.time;
    }

    if (!appointment.startsAt) {
        return "Horário não informado";
    }

    const start = new Date(appointment.startsAt);
    const end = appointment.endsAt ? new Date(appointment.endsAt) : null;
    const startTime = start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const endTime = end?.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return endTime ? `${startTime} · ${endTime}` : startTime;
}

function getExerciseStatus(exercise: PlanWeekExercise) {
    if (exercise.execution.feedbackPending) {
        return "Feedback pendente";
    }

    if (exercise.execution.completed) {
        return exercise.execution.feedbackSubmitted ? "Concluído" : "Concluído sem feedback";
    }

    return "Pendente";
}

export function ScheduleScreen() {
    const navigation = useNavigation<any>();
    const { planWeek, selectedDay, selectedDate, setSelectedDate, loading, error } = useScheduleViewModel();

    const handleGoBack = () =>
        navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

    function handleExercisePress(exercise: PlanWeekExercise) {
        if (exercise.execution.feedbackPending && exercise.execution.executionId) {
            navigation.navigate("Feedback", { executionId: exercise.execution.executionId });
            return;
        }

        navigation.navigate("Exercise", { prescriptionItemId: exercise.prescriptionItemId });
    }

    const selectedExercises = selectedDay?.exercises ?? [];
    const selectedAppointments = selectedDay?.appointments ?? [];
    const exercisesDone = selectedDay?.summary.completed ?? 0;
    const exercisesTotal = selectedDay?.summary.total ?? 0;
    const percentCompleted = selectedDay?.summary.percentCompleted ?? 0;
    const headerDate = planWeek?.today ? formatDisplayDate(planWeek.today) : "";

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
                                    {headerDate || "Plano semanal"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.content}>
                            <View style={styles.card}>
                                <View style={styles.calendarHeader}>
                                    <Text style={styles.monthTitle}>
                                        {planWeek ? `${formatShortDate(planWeek.weekStart)} - ${formatShortDate(planWeek.weekEnd)}` : "Semana atual"}
                                    </Text>
                                </View>

                                {loading && <Text style={styles.exerciseMeta}>Carregando agenda...</Text>}
                                {error && <Text style={{ color: "#E53935" }}>{error}</Text>}

                                <View style={styles.calendarGrid}>
                                    {planWeek?.days.map((day) => {
                                        const dayNumber = Number(day.date.split("-")[2]);
                                        const isSelected = selectedDate === day.date;
                                        const hasContent = day.summary.total > 0 || day.appointments.length > 0;

                                        return (
                                            <TouchableOpacity
                                                key={day.date}
                                                style={styles.dayCell}
                                                onPress={() => setSelectedDate(day.date)}
                                            >
                                                <View style={[
                                                    styles.dayInner,
                                                    isSelected && styles.daySelected,
                                                    day.isToday && !isSelected && styles.dayToday,
                                                ]}>
                                                    <Text style={[
                                                        styles.dayText,
                                                        isSelected && styles.dayTextSelected,
                                                        day.isToday && !isSelected && styles.dayTextToday,
                                                    ]}>
                                                        {dayNumber}
                                                    </Text>
                                                </View>
                                                {hasContent && (
                                                    <View style={[styles.dot, isSelected && styles.dotSelected]} />
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            <SectionHeader title="Sessões Agendadas" />
                            {selectedAppointments.length === 0 ? (
                                <View style={styles.card}>
                                    <Text style={styles.exerciseMeta}>Nenhuma sessão agendada para este dia.</Text>
                                </View>
                            ) : (
                                selectedAppointments.map((appointment, index) => (
                                    <View key={appointment.id ?? `${selectedDay?.date}-appointment-${index}`} style={[styles.card, styles.sessionCard]}>
                                        <View style={[
                                            styles.sessionStripe,
                                            { backgroundColor: appointment.status === "pendente" ? "#FFA726" : PRIMARY }
                                        ]} />
                                        <View style={styles.sessionBody}>
                                            <View style={styles.sessionTop}>
                                                <View>
                                                    <Text style={styles.sessionDate}>{selectedDay?.label}</Text>
                                                    <Text style={styles.sessionType}>{getAppointmentTitle(appointment)}</Text>
                                                </View>
                                                <View style={[
                                                    styles.sessionBadge,
                                                    { backgroundColor: appointment.status === "pendente" ? "#FFF3E0" : "#E8F5EE" }
                                                ]}>
                                                    <Text style={[
                                                        styles.sessionBadgeText,
                                                        { color: appointment.status === "pendente" ? "#E65100" : PRIMARY }
                                                    ]}>
                                                        {appointment.status ?? "Agendado"}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.sessionDetails}>
                                                <View style={styles.sessionDetailItem}>
                                                    <Text style={styles.sessionDetailIcon}>•</Text>
                                                    <Text style={styles.sessionDetailText}>{getAppointmentTime(appointment)}</Text>
                                                </View>
                                                <View style={styles.sessionDetailItem}>
                                                    <Text style={styles.sessionDetailIcon}>•</Text>
                                                    <Text style={styles.sessionDetailText}>{appointment.professional ?? "Profissional não informado"}</Text>
                                                </View>
                                                <View style={styles.sessionDetailItem}>
                                                    <Text style={styles.sessionDetailIcon}>•</Text>
                                                    <Text style={styles.sessionDetailText}>{appointment.location ?? "Local não informado"}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            )}

                            <SectionHeader title="Exercícios do Dia" />
                            <View style={styles.card}>
                                <View style={styles.exerciseProgressRow}>
                                    <Text style={styles.exerciseProgressLabel}>
                                        {exercisesDone}/{exercisesTotal} concluídos
                                    </Text>
                                    <Text style={styles.exerciseProgressPct}>
                                        {percentCompleted}%
                                    </Text>
                                </View>
                                <View style={styles.exerciseTrack}>
                                    <View style={[
                                        styles.exerciseFill,
                                        { width: `${percentCompleted}%` as any }
                                    ]} />
                                </View>

                                <View style={{ marginTop: 14 }}>
                                    {selectedExercises.length === 0 ? (
                                        <Text style={styles.exerciseMeta}>Nenhum exercício previsto para este dia.</Text>
                                    ) : (
                                        selectedExercises.map((exercise, idx) => {
                                            const completed = exercise.execution.completed && !exercise.execution.feedbackPending;

                                            return (
                                                <TouchableOpacity
                                                    key={`${selectedDay?.date}-${exercise.prescriptionItemId}`}
                                                    onPress={() => handleExercisePress(exercise)}
                                                    style={[
                                                        styles.exerciseRow,
                                                        idx < selectedExercises.length - 1 && styles.exerciseRowBorder,
                                                    ]}
                                                >
                                                    <View style={[
                                                        styles.exerciseCheck,
                                                        completed && styles.exerciseCheckDone,
                                                    ]}>
                                                        {completed && <Text style={styles.checkMark}>✓</Text>}
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[
                                                            styles.exerciseName,
                                                            completed && styles.exerciseNameDone,
                                                        ]}>
                                                            {exercise.title}
                                                        </Text>
                                                        <Text style={styles.exerciseMeta}>
                                                            {exercise.metrics.repetitionsRaw ?? exercise.metrics.volume ?? "Sem métricas"} · {getExerciseStatus(exercise)}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <AppFooter currentRoute="Schedule" />
        </SafeAreaView>
    );
}
