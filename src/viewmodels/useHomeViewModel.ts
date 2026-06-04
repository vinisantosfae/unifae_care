import { useState } from 'react';
import { HomeSnapshot, MotivationResponse, ProfileResponse } from '../models/Api';
import { getAuthorizedPhotoSource, getHomeSnapshot, getMotivation, getProfile } from '../services/patient_app';

type AuthorizedImageSource = {
  uri: string;
  headers?: {
    Authorization: string;
  };
};

export function useHomeViewModel() {
  const [home, setHome] = useState<HomeSnapshot | null>(null);
  const [motivation, setMotivation] = useState<MotivationResponse | null>(null);
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [coordinatorPhotoSource, setCoordinatorPhotoSource] = useState<AuthorizedImageSource | null>(null);
  const [responsibleStudentPhotoSource, setResponsibleStudentPhotoSource] =
    useState<AuthorizedImageSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadHome() {
    setLoading(true);
    setError(null);

    try {
      const [homeData, motivationData, profile] = await Promise.all([
        getHomeSnapshot(),
        getMotivation().catch(() => null),
        getProfile().catch(() => null),
      ]);

      setHome(homeData);
      setMotivation(motivationData);
      setProfileData(profile);

      if (profile) {
        const [coordinatorSource, responsibleSource] = await Promise.all([
          getAuthorizedPhotoSource(profile.coordinator?.photoUrl),
          getAuthorizedPhotoSource(profile.responsibleStudent?.photoUrl),
        ]);

        setCoordinatorPhotoSource(coordinatorSource);
        setResponsibleStudentPhotoSource(responsibleSource);
      } else {
        setCoordinatorPhotoSource(null);
        setResponsibleStudentPhotoSource(null);
      }
    } catch {
      setError('Não foi possível carregar a home.');
    } finally {
      setLoading(false);
    }
  }

  return {
    home,
    motivation,
    profileData,
    coordinatorPhotoSource,
    responsibleStudentPhotoSource,
    loading,
    error,
    reload: loadHome,
  };
}
