import { useEffect, useState } from 'react';
import { ExerciseListResponse } from '../models/Api';
import { getExercises } from '../services/patient_app';

export function useExercisesViewModel() {
  const [exercises, setExercises] = useState<ExerciseListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadExercises() {
    setLoading(true);
    setError(null);

    try {
      setExercises(await getExercises());
    } catch {
      setError('Não foi possível carregar os exercícios.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExercises();
  }, []);

  return { exercises, loading, error, reload: loadExercises };
}
