import {FONTS} from "../themes/fonts";
import { StyleSheet } from "react-native";

const PRIMARY = "#2E8B62";
const PRIMARY_LIGHT = "#349064BD";
const LIGHT = "#FFFFFF";

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: PRIMARY,
        paddingBottom: 24,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    backText: {
        color: LIGHT,
        textTransform: "uppercase",
        fontFamily: FONTS.main_semiBold,
        fontSize: 13,
    },
    appTitle: {
        color: LIGHT,
        fontFamily: FONTS.main_bold,
        fontSize: 20,
        textTransform: "uppercase",
    },
    headerBody: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    headerTitle: {
        color: LIGHT,
        fontFamily: FONTS.main_bold,
        fontSize: 26,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    headerSubtitle: {
        color: "rgba(255,255,255,0.75)",
        fontFamily: FONTS.main_light,
        fontSize: 14,
        marginTop: 4,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 20,
        marginBottom: 10,
    },
    sectionAccent: {
        width: 4,
        height: 18,
        backgroundColor: PRIMARY,
        borderRadius: 2,
    },
    sectionTitle: {
        fontFamily: FONTS.main_bold,
        fontSize: 15,
        color: "#333",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: LIGHT,
        borderRadius: 14,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 0,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    monthNavBtn: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8F5EE",
        borderRadius: 8,
    },
    monthNavArrow: {
        fontSize: 22,
        color: PRIMARY,
        lineHeight: 26,
    },
    monthTitle: {
        fontFamily: FONTS.main_bold,
        fontSize: 16,
        color: "#333",
        textTransform: "capitalize",
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 4,
    },
    weekLabel: {
        width: 36,
        textAlign: "center",
        fontFamily: FONTS.main_semiBold,
        fontSize: 12,
        color: PRIMARY_LIGHT,
        textTransform: "uppercase",
    },
    calendarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayCell: {
        width: "14.28%",
        alignItems: "center",
        paddingVertical: 3,
    },
    dayInner: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
    daySelected: {
        backgroundColor: PRIMARY,
    },
    dayToday: {
        borderWidth: 2,
        borderColor: PRIMARY,
    },
    dayText: {
        fontFamily: FONTS.main_regular,
        fontSize: 14,
        color: "#444",
    },
    dayTextSelected: {
        color: LIGHT,
        fontFamily: FONTS.main_bold,
    },
    dayTextToday: {
        color: PRIMARY,
        fontFamily: FONTS.main_bold,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: PRIMARY,
        marginTop: 2,
    },
    dotSelected: {
        backgroundColor: LIGHT,
    },
    sessionCard: {
        flexDirection: "row",
        padding: 0,
        overflow: "hidden",
        marginBottom: 10,
    },
    sessionStripe: {
        width: 5,
        borderRadius: 14,
    },
    sessionBody: {
        flex: 1,
        padding: 14,
    },
    sessionTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    sessionDate: {
        fontFamily: FONTS.main_semiBold,
        fontSize: 13,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    sessionType: {
        fontFamily: FONTS.main_bold,
        fontSize: 16,
        color: "#222",
        marginTop: 2,
    },
    sessionBadge: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    sessionBadgeText: {
        fontFamily: FONTS.main_semiBold,
        fontSize: 12,
    },
    sessionDetails: {
        marginTop: 12,
        gap: 6,
    },
    sessionDetailItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sessionDetailIcon: {
        fontSize: 14,
    },
    sessionDetailText: {
        fontFamily: FONTS.main_regular,
        fontSize: 13,
        color: "#555",
    },
    exerciseProgressRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    exerciseProgressLabel: {
        fontFamily: FONTS.main_regular,
        fontSize: 13,
        color: "#777",
    },
    exerciseProgressPct: {
        fontFamily: FONTS.main_bold,
        fontSize: 13,
        color: PRIMARY,
    },
    exerciseTrack: {
        height: 8,
        backgroundColor: "#E8F5EE",
        borderRadius: 4,
        marginTop: 8,
        overflow: "hidden",
    },
    exerciseFill: {
        height: "100%",
        backgroundColor: PRIMARY,
        borderRadius: 4,
    },
    exerciseRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
    },
    exerciseRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    exerciseCheck: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: "#CCC",
        alignItems: "center",
        justifyContent: "center",
    },
    exerciseCheckDone: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
    },
    checkMark: {
        color: LIGHT,
        fontSize: 13,
        fontFamily: FONTS.main_bold,
    },
    exerciseName: {
        fontFamily: FONTS.main_semiBold,
        fontSize: 14,
        color: "#333",
    },
    exerciseNameDone: {
        color: "#AAA",
        textDecorationLine: "line-through",
    },
    exerciseMeta: {
        fontFamily: FONTS.main_regular,
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    historyTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    historyDateBadge: {
        backgroundColor: "#E8F5EE",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    historyDateText: {
        fontFamily: FONTS.main_semiBold,
        fontSize: 12,
        color: PRIMARY,
    },
    historyTime: {
        fontFamily: FONTS.main_regular,
        fontSize: 12,
        color: "#999",
    },
    historyType: {
        fontFamily: FONTS.main_bold,
        fontSize: 15,
        color: "#222",
        marginTop: 10,
    },
    historyProfessional: {
        fontFamily: FONTS.main_regular,
        fontSize: 13,
        color: PRIMARY_LIGHT,
        marginTop: 2,
    },
    historyDivider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 10,
    },
    historyNote: {
        fontFamily: FONTS.main_regular,
        fontSize: 13,
        color: "#666",
        lineHeight: 19,
    },
});

export default styles;