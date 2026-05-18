import { useState } from 'react';
import { UserType, USER_TYPE_OPTIONS } from '../models/User';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  ra: string;
}

interface RegisterResult {
  user: null;
  errorMessage: string | null;
  successMessage: string | null;
}

export function useRegisterViewModel() {
  const [userType, setUserType] = useState<UserType>('patient');
  const [name, setName] = useState('');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const requiresRa = userType !== 'patient';
  const availableUserTypes = USER_TYPE_OPTIONS.filter((option) => option.enabled);
  const canSubmit =
    !!name.trim() &&
    !!email.trim() &&
    !!password.trim() &&
    !!confirmPassword.trim() &&
    (!requiresRa || !!ra.trim());

  async function register(payload?: Partial<RegisterPayload>): Promise<RegisterResult> {
    const formData = {
      password: payload?.password ?? password,
      confirmPassword: payload?.confirmPassword ?? confirmPassword,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      const message = 'As senhas não coincidem.';
      setError(message);
      setLoading(false);
      return { user: null, errorMessage: message, successMessage: null };
    }

    const message = 'Cadastro indisponível no momento.';
    setError(message);
    setLoading(false);
    return { user: null, errorMessage: message, successMessage: null };
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
    confirmPassword,
    setConfirmPassword,
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
