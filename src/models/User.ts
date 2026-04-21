export type UserType = 'patient' | 'physiotherapist' | 'student';

export interface UserTypeOption {
  key: UserType;
  label: string;
  enabled: boolean;
}

export const USER_TYPE_OPTIONS: UserTypeOption[] = [
  { key: 'physiotherapist', label: 'Fisioterapeuta', enabled: true },
  { key: 'student', label: 'Estudante', enabled: false },
  { key: 'patient', label: 'Paciente', enabled: true },
];

export interface User {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  tipoUsuario: UserType;
  ra: string | null;
  createdAt: string;
}

export interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: UserType;
  ra?: string | null;
}

export interface AuthUser {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: UserType;
  ra: string | null;
}
