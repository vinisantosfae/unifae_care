import { useState } from 'react';
import { userRepository } from '../repositories/UserRepository';

interface LoginResult {
  user: Awaited<ReturnType<typeof userRepository.login>> | null;
  errorMessage: string | null;
  successMessage: string | null;
}

interface UseLoginViewModelParams {
  onSuccess?: (user: Awaited<ReturnType<typeof userRepository.login>>) => Promise<void> | void;
}

export function useLoginViewModel(params?: UseLoginViewModelParams) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = !!email.trim() && !!password.trim();

  async function login(payload?: { email?: string; password?: string }): Promise<LoginResult> {
    const formData = {
      email: payload?.email ?? email,
      password: payload?.password ?? password,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const loggedUser = await userRepository.login(formData.email, formData.password);

      setSuccess('Login realizado com sucesso.');

      if (params?.onSuccess) {
        await params.onSuccess(loggedUser);
      }

      return {
        user: loggedUser,
        errorMessage: null,
        successMessage: 'Login realizado com sucesso.',
      };
    } catch (loginError) {
      const message =
        loginError instanceof Error
          ? loginError.message
          : 'Não foi possivel realizar o login.';

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
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    canSubmit,
    login,
    resetFeedback,
  };
}
