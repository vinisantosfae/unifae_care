import { useEffect, useState } from 'react';
import { ExerciseDetail, ExerciseListResponse } from '../models/Api';
import { completeExercise, getExerciseDetail, getExercises } from '../services/patient_app';

export type ExerciseWithStatus = ExerciseDetail & { completedToday: boolean };

export function useExerciseViewModel(prescriptionItemId?: number) {
  const [exercise, setExercise] = useState<ExerciseWithStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadExercise() {
    if (!prescriptionItemId) {
      setError('Exercício não informado.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // O detalhe não traz o status do dia; ele vem da listagem de exercícios
      const [detail, list] = await Promise.all([
        getExerciseDetail(prescriptionItemId),
        (getExercises() as Promise<ExerciseListResponse>).catch(() => null),
      ]);

      const listItem = list?.items.find((item) => Number(item.prescriptionItemId) === Number(prescriptionItemId));

      setExercise({ ...detail, completedToday: listItem?.completedToday ?? false });
    } catch {
      setError('Não foi possível carregar o exercício.');
    } finally {
      setLoading(false);
    }
  }

  async function concludeExercise() {
    if (!prescriptionItemId) {
      throw new Error('Exercício não informado.');
    }

    setSubmitting(true);
    setError(null);
    try {
      const completion = await completeExercise(prescriptionItemId);
      setExercise((current) => (current ? { ...current, completedToday: true } : current));
      return completion;
    } catch {
      setError('Não foi possível concluir o exercício.');
      throw new Error('Não foi possível concluir o exercício.');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    loadExercise();
  }, [prescriptionItemId]);

  return { exercise, completedToday: exercise?.completedToday ?? false, loading, submitting, error, reload: loadExercise, concludeExercise };
}
