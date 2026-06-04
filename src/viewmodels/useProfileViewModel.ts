import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { HomeSnapshot, PlanWeekResponse, ProfileResponse } from '../models/Api';
import {
  getAuthorizedPhotoSource,
  getHomeSnapshot,
  getPlanWeek,
  getProfile,
  updateProfilePhoto,
} from '../services/patient_app';

type AuthorizedImageSource = {
  uri: string;
  headers?: {
    Authorization: string;
  };
};

export function useProfileViewModel() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [painToday, setPainToday] = useState<HomeSnapshot['painToday'] | null>(null);
  const [weeklyGoalPercent, setWeeklyGoalPercent] = useState(0);
  const [currentPainNumber, setCurrentPainNumber] = useState<number | null>(null);
  const [hasPainToday, setHasPainToday] = useState(false);
  const [profilePhotoSource, setProfilePhotoSource] = useState<AuthorizedImageSource | null>(null);
  const [coordinatorPhotoSource, setCoordinatorPhotoSource] = useState<AuthorizedImageSource | null>(null);
  const [responsibleStudentPhotoSource, setResponsibleStudentPhotoSource] =
    useState<AuthorizedImageSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function withCacheBust(source: AuthorizedImageSource | null, cacheKey?: number) {
    if (!source || !cacheKey) {
      return source;
    }

    const separator = source.uri.includes('?') ? '&' : '?';

    return {
      ...source,
      uri: `${source.uri}${separator}updatedAt=${cacheKey}`,
    };
  }

  async function updatePhotoSources(nextProfileData: ProfileResponse, profilePhotoCacheKey?: number) {
    const [profileSource, coordinatorSource, responsibleSource] = await Promise.all([
      getAuthorizedPhotoSource(nextProfileData.profile.photoUrl),
      getAuthorizedPhotoSource(nextProfileData.coordinator?.photoUrl),
      getAuthorizedPhotoSource(nextProfileData.responsibleStudent?.photoUrl),
    ]);

    setProfilePhotoSource(withCacheBust(profileSource, profilePhotoCacheKey));
    setCoordinatorPhotoSource(coordinatorSource);
    setResponsibleStudentPhotoSource(responsibleSource);
  }

  function calculateWeeklyGoalPercent(planWeek: PlanWeekResponse | null) {
    if (!planWeek) {
      return 0;
    }

    const totals = planWeek.days.reduce(
      (acc, day) => ({
        total: acc.total + day.summary.total,
        completed: acc.completed + day.summary.completed,
      }),
      { total: 0, completed: 0 }
    );

    return totals.total > 0 ? Math.round((totals.completed / totals.total) * 100) : 0;
  }

  function mapFeedbackScoreToPainNumber(score: number) {
    if (score <= 0) {
      return 1;
    }

    return Math.min(10, Math.max(1, score));
  }

  function mapPainLevelToPainNumber(level?: string | null) {
    const painLevelMap: Record<string, number> = {
      NONE: 1,
      MILD: 3,
      SEVERE: 8,
    };

    return level ? painLevelMap[level] ?? null : null;
  }

  function calculateCurrentPainNumber(
    planWeek: PlanWeekResponse | null,
    painSnapshot: HomeSnapshot['painToday'] | null
  ) {
    const today = planWeek?.days.find((day) => day.isToday);
    const feedbackScores =
      today?.exercises
        .map((exercise) => exercise.execution)
        .filter((execution) => execution.feedbackSubmitted && execution.feedbackScore !== null)
        .map((execution) => execution.feedbackScore as number) ?? [];

    if (feedbackScores.length > 0) {
      return mapFeedbackScoreToPainNumber(Math.max(...feedbackScores));
    }

    if (painSnapshot?.recorded) {
      return mapPainLevelToPainNumber(painSnapshot.level);
    }

    return null;
  }

  async function loadProfile() {
    setLoading(true);
    setError(null);

    try {
      const [nextProfileData, homeSnapshot, planWeek] = await Promise.all([
        getProfile(),
        getHomeSnapshot().catch(() => null),
        getPlanWeek().catch(() => null),
      ]);
      setProfileData(nextProfileData);
      setPainToday(homeSnapshot?.painToday ?? null);
      setWeeklyGoalPercent(calculateWeeklyGoalPercent(planWeek));
      const nextPainNumber = calculateCurrentPainNumber(planWeek, homeSnapshot?.painToday ?? null);
      setCurrentPainNumber(nextPainNumber);
      setHasPainToday(nextPainNumber !== null);
      await updatePhotoSources(nextProfileData);
    } catch {
      setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  }

  async function pickAndUploadProfilePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      const message = 'Permita o acesso à galeria para atualizar a foto.';
      setError(message);
      return { success: false, message };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return { success: false };
    }

    setUploadingPhoto(true);
    setError(null);

    try {
      const response = await updateProfilePhoto(result.assets[0]);

      if (profileData) {
        const nextProfileData = {
          ...profileData,
          profile: {
            ...profileData.profile,
            photoUrl: response.photoUrl,
          },
        };

        setProfileData(nextProfileData);
        await updatePhotoSources(nextProfileData, Date.now());
      } else {
        await loadProfile();
      }

      return {
        success: true,
        message: response.message ?? 'Foto de perfil atualizada com sucesso.',
      };
    } catch {
      const message = 'Não foi possível atualizar a foto de perfil.';
      setError(message);
      return { success: false, message };
    } finally {
      setUploadingPhoto(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profileData,
    painToday,
    weeklyGoalPercent,
    currentPainNumber,
    hasPainToday,
    profilePhotoSource,
    coordinatorPhotoSource,
    responsibleStudentPhotoSource,
    loading,
    uploadingPhoto,
    error,
    reload: loadProfile,
    pickAndUploadProfilePhoto,
  };
}
