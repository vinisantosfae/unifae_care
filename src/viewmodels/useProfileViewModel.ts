import { useEffect, useState } from 'react';
import { ProfileResponse } from '../models/Api';
import { getProfile } from '../services/patient_app';

export function useProfileViewModel() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProfile() {
    setLoading(true);
    setError(null);

    try {
      setProfileData(await getProfile());
    } catch {
      setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return { profileData, loading, error, reload: loadProfile };
}
