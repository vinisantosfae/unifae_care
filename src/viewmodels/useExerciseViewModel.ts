import { useEffect, useState } from 'react';
import { ExerciseDetail } from '../models/Api';
import { completeExercise, getExerciseDetail } from '../services/patient_app';

export function useExerciseViewModel(prescriptionItemId?: number) {
  const [exercise, setExercise] = useState<ExerciseDetail | null>(null);
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
      setExercise(await getExerciseDetail(prescriptionItemId));
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
      return await completeExercise(prescriptionItemId);
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

  return { exercise, loading, submitting, error, reload: loadExercise, concludeExercise };
}
