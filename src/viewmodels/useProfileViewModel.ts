import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ProfileResponse } from '../models/Api';
import { getAuthorizedPhotoSource, getProfile, updateProfilePhoto } from '../services/patient_app';

type AuthorizedImageSource = {
  uri: string;
  headers?: {
    Authorization: string;
  };
};

export function useProfileViewModel() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [profilePhotoSource, setProfilePhotoSource] = useState<AuthorizedImageSource | null>(null);
  const [coordinatorPhotoSource, setCoordinatorPhotoSource] = useState<AuthorizedImageSource | null>(null);
  const [responsibleStudentPhotoSource, setResponsibleStudentPhotoSource] =
    useState<AuthorizedImageSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePhotoSources(nextProfileData: ProfileResponse) {
    const [profileSource, coordinatorSource, responsibleSource] = await Promise.all([
      getAuthorizedPhotoSource(nextProfileData.profile.photoUrl),
      getAuthorizedPhotoSource(nextProfileData.coordinator?.photoUrl),
      getAuthorizedPhotoSource(nextProfileData.responsibleStudent?.photoUrl),
    ]);

    setProfilePhotoSource(profileSource);
    setCoordinatorPhotoSource(coordinatorSource);
    setResponsibleStudentPhotoSource(responsibleSource);
  }

  async function loadProfile() {
    setLoading(true);
    setError(null);

    try {
      const nextProfileData = await getProfile();
      setProfileData(nextProfileData);
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
        await updatePhotoSources(nextProfileData);
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
