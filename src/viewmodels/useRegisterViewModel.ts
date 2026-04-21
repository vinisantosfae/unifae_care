import { useState } from 'react';
import { userRepository } from '../repositories/UserRepository';
import { AuthUser, UserType, USER_TYPE_OPTIONS } from '../models/User';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  ra: string;
}

interface UseRegisterViewModelParams {
  onSuccess?: (user: AuthUser) => Promise<void> | void;
}

interface RegisterResult {
  user: AuthUser | null;
  errorMessage: string | null;
  successMessage: string | null;
}

export function useRegisterViewModel(params?: UseRegisterViewModelParams) {
  const [userType, setUserType] = useState<UserType>('patient');
  const [name, setName] = useState('');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const requiresRa = userType !== 'patient';
  const availableUserTypes = USER_TYPE_OPTIONS.filter((option) => option.enabled);
  const canSubmit =
    !!name.trim() &&
    !!email.trim() &&
    !!password.trim() &&
    (!requiresRa || !!ra.trim());

  async function register(payload?: Partial<RegisterPayload>): Promise<RegisterResult> {
    const formData = {
      name: payload?.name ?? name,
      email: payload?.email ?? email,
      password: payload?.password ?? password,
      userType: payload?.userType ?? userType,
      ra: payload?.ra ?? ra,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const createdUser = await userRepository.createUser({
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
        tipoUsuario: formData.userType,
        ra: formData.userType === 'patient' ? null : formData.ra,
      });

      setSuccess('Cadastro realizado com sucesso.');

      if (params?.onSuccess) {
        await params.onSuccess(createdUser);
      }

      return {
        user: createdUser,
        errorMessage: null,
        successMessage: 'Cadastro realizado com sucesso.',
      };
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : 'Nao foi possivel concluir o cadastro.';

      setError(message);
      return {
        user: null,
        errorMessage: message,
        successMessage: null,
      };
    } finally {
      setLoading(false);
    }
  }

  function resetFeedback() {
    setError(null);
    setSuccess(null);
  }

  return {
    userType,
    setUserType,
    name,
    setName,
    ra,
    setRa,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    requiresRa,
    availableUserTypes,
    canSubmit,
    register,
    resetFeedback,
  };
}
