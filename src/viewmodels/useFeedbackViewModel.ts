import { useState } from 'react';
import { PainLevel } from '../models/Api';
import { submitDailyPain, submitExerciseFeedback } from '../services/patient_app';

function mapFeedbackToPainLevel(feedbackLevel: number): PainLevel {
  if (feedbackLevel === 0) {
    return 'NONE';
  }

  if (feedbackLevel <= 2) {
    return 'MILD';
  }

  return 'SEVERE';
}

export function useFeedbackViewModel(executionId?: number) {
  const [observations, setObservations] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function saveFeedback() {
    if (!executionId) {
      setError('Execução não informada.');
      return false;
    }

    if (feedbackLevel === null) {
      setError('Selecione um nível de dor ou esforço.');
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await submitExerciseFeedback(executionId, {
        score: feedbackLevel,
        notes: observations.trim() || undefined,
      });
      await submitDailyPain(mapFeedbackToPainLevel(feedbackLevel));
      setSuccess('Feedback salvo com sucesso.');
      return true;
    } catch {
      setError('Não foi possível salvar o feedback.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    observations,
    setObservations,
    feedbackLevel,
    setFeedbackLevel,
    loading,
    error,
    success,
    saveFeedback,
  };
}
