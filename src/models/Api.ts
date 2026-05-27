export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
  appId: number;
  courseId: number;
  nextVisitDate: string | null;
}

export interface ConsentRequired {
  consentTermId: number;
  courseId: number;
  version: string;
  title: string | null;
  content: string;
}

export interface AuthSession {
  accessToken: string;
  user: ApiUser;
  consentRequired: ConsentRequired | null;
  appId: number;
}

export interface HomeSnapshot {
  painToday: {
    recorded: boolean;
    level: string | null;
    recordedAt: string | null;
  };
  plan: {
    totalExercises: number;
    completedExercises: number;
    percentCompleted: number;
  };
  nextExercise: {
    prescriptionId: number;
    prescriptionItemId: number;
    exerciseId: number;
    exerciseName: string;
    axis: string;
    problem: string;
    objective: string;
  } | null;
  motivation: {
    id: number;
    message: string;
  } | null;
}

export type PainLevel = 'NONE' | 'MILD' | 'SEVERE';

export interface MotivationResponse {
  id: number;
  message: string;
}

export interface ProfilePhotoResponse {
  message: string;
  photoUrl: string;
}

export interface ExerciseExecution {
  completed: boolean;
  executionId: number | null;
  performedAt: string | null;
  feedbackSubmitted: boolean;
  feedbackScore: number | null;
  feedbackRecordedAt: string | null;
  feedbackPending: boolean;
}

export interface ExerciseListItem {
  prescriptionItemId: number;
  exerciseId: number;
  title: string;
  taxonomy: {
    axis: string;
    problem: string;
    objective: string;
  };
  completedToday: boolean;
}

export interface ExerciseListResponse {
  prescriptionId: number;
  items: ExerciseListItem[];
}

export interface ExerciseDetail extends Omit<ExerciseListItem, 'completedToday'> {
  prescriptionId: number;
  videoUrl: string;
  description: string;
  metrics: {
    repetitionsRaw: string;
    series: string;
    volume: string;
  };
  instructions: string;
  physiotherapistNotes: string;
}

export interface PlanWeekExercise extends ExerciseDetail {
  steps: Array<{
    order: number;
    text: string;
  }>;
  execution: ExerciseExecution;
}

export interface PlanWeekAppointment {
  id?: number;
  startsAt?: string;
  endsAt?: string;
  time?: string;
  duration?: string;
  type?: string;
  title?: string;
  professional?: string;
  location?: string;
  status?: string;
}

export interface PlanWeekDay {
  date: string;
  label: string;
  isToday: boolean;
  summary: {
    total: number;
    completed: number;
    pendingFeedback: number;
    percentCompleted: number;
  };
  exercises: PlanWeekExercise[];
  appointments: PlanWeekAppointment[];
}

export interface PlanWeekResponse {
  today: string;
  weekStart: string;
  weekEnd: string;
  prescriptionId: number;
  days: PlanWeekDay[];
}

export interface ExerciseCompletion {
  executionId: number;
  prescriptionId: number;
  prescriptionItemId: number;
  exerciseId: number;
  performedAt: string;
  message: string;
}

export interface ProfileResponse {
  profile: {
    id: number;
    name: string;
    email: string;
    role: string;
    photoUrl: string | null;
  };
  app?: {
    id: number;
    name: string;
  };
  course?: {
    id: number;
    name: string;
  };
  responsibleStudent?: {
    id: number;
    name: string;
    email: string;
    photoUrl: string | null;
  } | null;
  coordinator: {
    id: number;
    name: string;
    email: string;
    photoUrl: string | null;
    primarySpecialty: string;
    specialties: Array<{
      id: number;
      name: string;
      isPrimary: boolean;
    }>;
  } | null;
  weeklyProgress?: {
    from: string;
    to: string;
    prescribedExercises: number;
    completedExercises: number;
    percentCompleted: number;
  };
}
