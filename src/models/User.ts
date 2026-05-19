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

